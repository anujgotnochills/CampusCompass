'use server';
/**
 * @fileOverview An AI agent for matching a single lost item against a list of found items.
 *
 * - findMatchingItems - A function that handles the matching process.
 * - FindMatchingItemsInput - The input type for the findMatchingItems function.
 * - FindMatchingItemsOutput - The return type for the findMatchingItems function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { Item } from '@/lib/types';


const FoundItemSchema = z.object({
  id: z.string(),
  description: z.string(),
  image_data_uri: z.string().optional(),
});

const FindMatchingItemsInputSchema = z.object({
  lostItem: z.object({
    id: z.string(),
    description: z.string(),
    image_data_uri: z.string().optional(),
  }),
  foundItems: z.array(FoundItemSchema),
});
export type FindMatchingItemsInput = z.infer<typeof FindMatchingItemsInputSchema>;


const MatchResultSchema = z.object({
  foundItemId: z.string().describe("The ID of the found item that is a potential match."),
  matchConfidence: z.number().describe('A score between 0 and 1 indicating the confidence that the items match.'),
  reason: z.string().describe('The reasoning behind the match confidence score.'),
});

const FindMatchingItemsOutputSchema = z.object({
  matches: z.array(MatchResultSchema),
});
export type FindMatchingItemsOutput = z.infer<typeof FindMatchingItemsOutputSchema>;


export async function findMatchingItems(input: FindMatchingItemsInput): Promise<FindMatchingItemsOutput> {
  return findMatchingItemsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findMatchingItemsPrompt',
  input: {schema: FindMatchingItemsInputSchema},
  output: {schema: FindMatchingItemsOutputSchema},
  prompt: `You are an AI assistant helping to match a lost item against a list of found items.

You will receive one lost item and a list of found items. Your task is to analyze the lost item and compare it against every item in the found list.

For each found item, determine how likely it is to be a match for the lost item. Consider all available information: descriptions and images. An image is a very strong signal.

Lost Item Description: {{{lostItem.description}}}
{{#if lostItem.image_data_uri}}Lost Item Photo: {{media url=lostItem.image_data_uri}}{{/if}}

Here is the list of found items to check against:
{{#each foundItems}}
---
Found Item ID: {{{this.id}}}
Description: {{{this.description}}}
{{#if this.image_data_uri}}Photo: {{media url=this.image_data_uri}}{{/if}}
---
{{/each}}

Based on all the details, identify all potential matches. For each match, provide the 'foundItemId', a 'matchConfidence' score between 0 and 1 (where 0 is no match and 1 is a perfect match), and explain your 'reason'. If there are no good matches (e.g., confidence < 0.5), return an empty array for "matches".
`,
});

const findMatchingItemsFlow = ai.defineFlow(
  {
    name: 'findMatchingItemsFlow',
    inputSchema: FindMatchingItemsInputSchema,
    outputSchema: FindMatchingItemsOutputSchema,
  },
  async (input: FindMatchingItemsInput) => {
    if (input.foundItems.length === 0) {
      return { matches: [] };
    }
    const {output} = await prompt(input);
    return output!;
  }
);
