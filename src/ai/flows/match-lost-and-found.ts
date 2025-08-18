'use server';
/**
 * @fileOverview An AI agent for matching lost and found items based on their descriptions.
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
  prompt: `You are an AI assistant helping to match lost and found items based on their descriptions.

You will receive the descriptions of a lost item and a found item. Your task is to determine how likely it is that these two items are the same.

Lost Item Description: {{{lostItemDescription}}}
Found Item Description: {{{foundItemDescription}}}

Based on the descriptions, provide a matchConfidence score between 0 and 1 (where 0 means no match and 1 means a perfect match) and explain your reasoning.
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

