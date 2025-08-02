'use server';

/**
 * @fileOverview Generates subtle animations based on user interactions using AI.
 *
 * - generateAnimation - A function that generates an animation based on a text prompt.
 * - GenerateAnimationInput - The input type for the generateAnimation function.
 * - GenerateAnimationOutput - The return type for the generateAnimation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAnimationInputSchema = z.object({
  interactionType: z
    .string()
    .describe('The type of user interaction (e.g., hover, click, scroll).'),
  elementName: z
    .string()
    .describe('The name of the element the user is interacting with.'),
});

export type GenerateAnimationInput = z.infer<typeof GenerateAnimationInputSchema>;

const GenerateAnimationOutputSchema = z.object({
  animationDataUri: z
    .string()
    .describe(
      'A data URI containing the animation data (e.g., Lottie JSON) that represents the generated animation.'
    ),
});

export type GenerateAnimationOutput = z.infer<typeof GenerateAnimationOutputSchema>;

export async function generateAnimation(
  input: GenerateAnimationInput
): Promise<GenerateAnimationOutput> {
  return generateAnimationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAnimationPrompt',
  input: {schema: GenerateAnimationInputSchema},
  output: {schema: GenerateAnimationOutputSchema},
  prompt: `You are a creative animation generator.  Given a user interaction with a website, you will generate a short, subtle animation that enhances the user experience.

Interaction Type: {{{interactionType}}}
Element Name: {{{elementName}}}

Generate animation data URI (e.g., Lottie JSON):`,
});

const generateAnimationFlow = ai.defineFlow(
  {
    name: 'generateAnimationFlow',
    inputSchema: GenerateAnimationInputSchema,
    outputSchema: GenerateAnimationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
