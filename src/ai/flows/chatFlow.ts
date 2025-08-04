
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export type ChatInput = z.infer<typeof ChatInputSchema>;
const ChatInputSchema = z.object({
  question: z.string(),
  context: z.string(),
});


export async function chatAboutContext(input: ChatInput) {
    const prompt = `Du bist ein freundlicher und hilfsbereiter KI-Assistent für das Portfolio von Benedikt Schächner.
Beantworte die folgende Frage des Benutzers ausschließlich auf Basis des bereitgestellten Kontexts.
Sei prägnant und bleibe beim Thema. Antworte immer auf Deutsch.

Kontext:
---
${input.context}
---

Frage des Benutzers: ${input.question}
`;

    const llmResponse = await ai.generate({
      prompt: prompt,
      model: 'gemini-2.0-flash',
      config: {
        temperature: 0.5,
      },
    });

    return llmResponse.text;
}
