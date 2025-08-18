'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate an item title from a description.
 *
 * - generateItemTitle - A function that generates an item title based on the provided description.
 * - GenerateItemTitleInput - The input type for the generateItemTitle function.
 * - GenerateItemTitleOutput - The return type for the generateItemTitle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateItemTitleInputSchema = z.object({
  description: z
    .string()
    .describe('The description of the lost or found item.'),
});
export type GenerateItemTitleInput = z.infer<typeof GenerateItemTitleInputSchema>;

const GenerateItemTitleOutputSchema = z.object({
  title: z.string().describe('The generated title for the item.'),
});
export type GenerateItemTitleOutput = z.infer<typeof GenerateItemTitleOutputSchema>;

export async function generateItemTitle(input: GenerateItemTitleInput): Promise<GenerateItemTitleOutput> {
  return generateItemTitleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateItemTitlePrompt',
  input: {schema: GenerateItemTitleInputSchema},
  output: {schema: GenerateItemTitleOutputSchema},
  prompt: `You are an expert at creating concise and descriptive titles for lost or found items.

  Based on the following description, generate a title that accurately represents the item:

  Description: {{{description}}}
  `,
});

const generateItemTitleFlow = ai.defineFlow(
  {
    name: 'generateItemTitleFlow',
    inputSchema: GenerateItemTitleInputSchema,
    outputSchema: GenerateItemTitleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
