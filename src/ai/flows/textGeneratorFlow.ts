
'use server';
/**
 * @fileOverview A simple text generator flow.
 *
 * - generateText - A function that generates text based on a topic and type.
 * - GenerateTextInput - The input type for the generateText function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const GenerateTextInputSchema = z.object({
    topic: z.string().describe('The topic for the text generation.'),
    type: z.string().describe('The type of text to generate (e.g., "Blog-Idee", "Tweet", "Gedicht").'),
});
export type GenerateTextInput = z.infer<typeof GenerateTextInputSchema>;

const prompt = ai.definePrompt({
    name: 'textGeneratorPrompt',
    input: { schema: GenerateTextInputSchema },
    prompt: `Du bist ein kreativer Autor. Erstelle einen kurzen Text basierend auf dem folgenden Thema und Typ.
    Antworte immer auf Deutsch.

    Thema: {{{topic}}}
    Typ: {{{type}}}
    
    Dein Ergebnis:`,
});

export async function generateText(input: GenerateTextInput): Promise<string> {
    const llmResponse = await prompt(input);
    return llmResponse.text();
}
