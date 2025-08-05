
'use server';
/**
 * @fileOverview A simple text generator flow.
 *
 * - generateText - A function that generates text based on a topic and type.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { GenerateTextInput, GenerateTextInputSchema } from './types';


const prompt = ai.definePrompt({
    name: 'textGeneratorPrompt',
    model: googleAI.model('gemini-1.5-flash-latest'),
    input: { schema: GenerateTextInputSchema },
    prompt: `Du bist ein kreativer Autor. Erstelle einen kurzen Text basierend auf dem folgenden Thema und Typ.
    Antworte immer auf Deutsch.

    Thema: {{{topic}}}
    Typ: {{{type}}}
    
    Dein Ergebnis:`,
});

export async function generateText(input: GenerateTextInput): Promise<string> {
    const { output } = await prompt(input);
    return output || '';
}
