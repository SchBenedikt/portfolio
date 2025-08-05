'use server';

/**
 * @fileOverview A flow for generating an inspiring quote.
 *
 * - generateQuote - A function that generates a quote based on a topic.
 * - QuoteInput - The input type for the generateQuote function.
 * - QuoteOutput - The return type for the generateQuote function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const QuoteInputSchema = z.object({
  topic: z.string().describe('The topic for the quote, e.g., a job title or a theme.'),
});
export type QuoteInput = z.infer<typeof QuoteInputSchema>;

const QuoteOutputSchema = z.object({
  quote: z.string().describe('The generated quote.'),
  author: z.string().describe('The person who said the quote. Could be a real person or "AI" if it\'s an original quote.'),
});
export type QuoteOutput = z.infer<typeof QuoteOutputSchema>;

export async function generateQuote(input: QuoteInput): Promise<QuoteOutput> {
  return quoteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'quotePrompt',
  input: { schema: QuoteInputSchema },
  output: { schema: QuoteOutputSchema },
  prompt: `Generate a short, inspiring, and witty quote related to the user's role: {{{topic}}}. 
  The quote should be suitable for a creative portfolio. It can be a real quote or an original one. 
  If it's a real quote, provide the author. If it's an AI-generated original, set the author to "AI". 
  Keep the quote to a maximum of 25 words.`,
});

const quoteFlow = ai.defineFlow(
  {
    name: 'quoteFlow',
    inputSchema: QuoteInputSchema,
    outputSchema: QuoteOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
