
'use server';
/**
 * @fileOverview A flow to generate a daily quote.
 *
 * - getDailyQuote - A function that returns a quote about work, success, or the future.
 * - Quote - The return type for the getDailyQuote function.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'zod';

const QuoteSchema = z.object({
  quote: z.string().describe('The generated quote.'),
  author: z.string().describe('The author of the generated quote.'),
});
export type Quote = z.infer<typeof QuoteSchema>;

const prompt = ai.definePrompt({
  name: 'quoteGeneratorPrompt',
  output: { schema: QuoteSchema },
  prompt: `Generiere ein inspirierendes, kurzes Zitat von einer berühmten Persönlichkeit (z.B. Unternehmer, Wissenschaftler, Künstler) über die Themen Arbeit, Erfolg oder Zukunft.
  
  Antworte immer auf Deutsch. Gib nur das Zitat und den Autor zurück.`,
});

export async function getDailyQuote(): Promise<Quote> {
    const { output } = await prompt();
    
    if (!output) {
        return {
            quote: "Die Zukunft gehört denen, die an die Schönheit ihrer Träume glauben.",
            author: "Eleanor Roosevelt"
        }
    }
    return output;
}
