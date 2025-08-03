
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ChatInputSchema = z.object({
  question: z.string(),
  context: z.string(),
});

export type ChatInput = z.infer<typeof ChatInputSchema>;

export const chatAboutContext = ai.defineFlow(
  {
    name: 'chatAboutContext',
    inputSchema: ChatInputSchema,
    outputSchema: z.string(),
  },
  async ({ question, context }) => {
    const prompt = `Du bist ein freundlicher und hilfsbereiter KI-Assistent für das Portfolio von Benedikt Schächner.
Beantworte die folgende Frage des Benutzers ausschließlich auf Basis des bereitgestellten Kontexts.
Sei prägnant und bleibe beim Thema. Antworte immer auf Deutsch.

Kontext:
---
${context}
---

Frage des Benutzers: ${question}
`;

    const llmResponse = await ai.generate({
      prompt: prompt,
      model: 'gemini-1.5-flash',
      config: {
        temperature: 0.5,
      },
    });

    return llmResponse.text();
  }
);
