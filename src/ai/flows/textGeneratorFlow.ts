
'use server';
/**
 * @fileOverview A simple text generator flow.
 *
 * - generateText - A function that generates text based on a topic and type.
 */

import { ai } from '@/ai/genkit';
import { GenerateTextInput, GenerateTextInputSchema } from './types';


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
    const llmResponse = await ai.generate({
        model: 'gemini-pro',
        prompt: await prompt.render({input}),
    });
    return llmResponse.text;
}
