
import { z } from 'zod';

export const GenerateTextInputSchema = z.object({
    topic: z.string().describe('The topic for the text generation.'),
    type: z.string().describe('The type of text to generate (e.g., "Blog-Idee", "Tweet", "Gedicht").'),
});
export type GenerateTextInput = z.infer<typeof GenerateTextInputSchema>;
