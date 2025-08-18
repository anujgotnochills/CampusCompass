'use server';
/**
 * @fileOverview An AI agent for matching lost and found items based on their descriptions and images.
 *
 * - matchLostAndFound - A function that handles the matching process.
 * - MatchLostAndFoundInput - The input type for the matchLostAndFound function.
 * - MatchLostAndFoundOutput - The return type for the matchLostAndFound function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MatchLostAndFoundInputSchema = z.object({
  lostItemDescription: z
    .string()
    .describe('The description of the lost item.'),
  foundItemDescription: z
    .string()
    .describe('The description of the found item.'),
  lostItemImageDataUri: z
    .string()
    .optional()
    .describe(
      "A photo of the lost item, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  foundItemImageDataUri: z
    .string()
    .optional()
    .describe(
      "A photo of the found item, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type MatchLostAndFoundInput = z.infer<typeof MatchLostAndFoundInputSchema>;

const MatchLostAndFoundOutputSchema = z.object({
  matchConfidence: z
    .number()
    .describe(
      'A score between 0 and 1 indicating the confidence that the lost and found items match.'
    ),
  reason: z.string().describe('The reasoning behind the match confidence score.'),
});
export type MatchLostAndFoundOutput = z.infer<typeof MatchLostAndFoundOutputSchema>;

export async function matchLostAndFound(input: MatchLostAndFoundInput): Promise<MatchLostAndFoundOutput> {
  return matchLostAndFoundFlow(input);
}

const prompt = ai.definePrompt({
  name: 'matchLostAndFoundPrompt',
  input: {schema: MatchLostAndFoundInputSchema},
  output: {schema: MatchLostAndFoundOutputSchema},
  prompt: `You are an AI assistant helping to match lost and found items based on their descriptions and/or images.

You will receive the descriptions and optionally images of a lost item and a found item. Your task is to determine how likely it is that these two items are the same.
Consider all available information: text descriptions and images. An image can be a very strong signal.

Lost Item Description: {{{lostItemDescription}}}
{{#if lostItemImageDataUri}}Lost Item Photo: {{media url=lostItemImageDataUri}}{{/if}}

Found Item Description: {{{foundItemDescription}}}
{{#if foundItemImageDataUri}}Found Item Photo: {{media url=foundItemImageDataUri}}{{/if}}

Based on all the details, provide a matchConfidence score between 0 and 1 (where 0 means no match and 1 means a perfect match) and explain your reasoning.
`,
});

const matchLostAndFoundFlow = ai.defineFlow(
  {
    name: 'matchLostAndFoundFlow',
    inputSchema: MatchLostAndFoundInputSchema,
    outputSchema: MatchLostAndFoundOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
