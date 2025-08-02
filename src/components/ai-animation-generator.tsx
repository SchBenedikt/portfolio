"use client";

import { useState } from 'react';
import Lottie from 'lottie-react';
import { Button } from '@/components/ui/button';
import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
// import { generateAnimation } from '@/ai/flows/generate-animation';

// A placeholder Lottie animation JSON
const placeholderAnimation = {
  v: "5.5.7",
  fr: 30,
  ip: 0,
  op: 30,
  w: 200,
  h: 200,
  nm: "Placeholder Animation",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Shape Layer 1",
      sr: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: { a: 0, k: 0, ix: 10 },
        p: { a: 0, k: [100, 100, 0], ix: 2 },
        a: { a: 0, k: [0, 0, 0], ix: 1 },
        s: {
          a: 1,
          k: [
            { t: 0, s: [0, 0], e: [100, 100], o: {x: [0.833], y: [0.833]}, i: {x: [0.167], y: [0.167]} },
            { t: 15, s: [100, 100], e: [0, 0], o: {x: [0.833], y: [0.833]}, i: {x: [0.167], y: [0.167]} },
            { t: 30, s: [0, 0] }
          ],
          ix: 6,
        },
      },
      ao: 0,
      shapes: [
        {
          ind: 0,
          ty: "gr",
          it: [
            {
              ind: 0,
              ty: "el",
              s: { a: 0, k: [50, 50], ix: 2 },
              p: { a: 0, k: [0, 0], ix: 3 },
              nm: "Ellipse Path 1",
            },
            {
              ty: "st",
              c: { a: 0, k: [0.56, 0, 1, 1], ix: 3 },
              o: { a: 0, k: 100, ix: 4 },
              w: { a: 0, k: 5, ix: 5 },
            },
          ],
          nm: "Group 1",
        },
      ],
      ip: 0,
      op: 30,
      st: 0,
      bm: 0,
    },
  ],
};


export function AiAnimationGenerator({ elementName }: { elementName: string }) {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    setAnimationData(null);
    try {
      // In a real scenario, you would call the AI flow:
      // const { animationDataUri } = await generateAnimation({ interactionType: 'click', elementName });
      // const response = await fetch(animationDataUri);
      // const data = await response.json();
      // setAnimationData(data);
      
      // We'll use a placeholder for demonstration purposes
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAnimationData(placeholderAnimation);
      toast({
        title: "Animation Generated!",
        description: "A unique animation was created just for you.",
      });

    } catch (error) {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem generating the animation.",
        });
      console.error('Failed to generate animation', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <Button onClick={handleGenerate} disabled={isLoading} variant="ghost" className="text-accent hover:text-accent-foreground hover:bg-accent/20">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Wand2 className="mr-2 h-4 w-4" />
        )}
        <span>{isLoading ? 'Conjuring...' : 'Generate AI Animation'}</span>
      </Button>
      {animationData && (
        <div className="w-32 h-32 -mt-4 -ml-4 pointer-events-none">
          <Lottie animationData={animationData} loop={false} />
        </div>
      )}
    </div>
  );
}
