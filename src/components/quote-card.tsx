
'use client';

import { generateQuote, QuoteOutput } from '@/ai/flows/quoteGeneratorFlow';
import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { RefreshCw, Wand2 } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

interface QuoteCardProps {
  topic: string;
}

export const QuoteCard = ({ topic }: QuoteCardProps) => {
  const [quote, setQuote] = useState<QuoteOutput | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchQuote = useCallback(async () => {
    setLoading(true);
    try {
      const newQuote = await generateQuote({ topic });
      setQuote(newQuote);
    } catch (error) {
      console.error('Error generating quote:', error);
      setQuote({
        quote: 'Fehler beim Laden des Zitats. Bitte versuchen Sie es erneut.',
        author: 'System',
      });
    } finally {
      setLoading(false);
    }
  }, [topic]);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return (
    <Card className="rounded-2xl border-border/50">
      <CardContent className="p-6 text-center flex flex-col items-center justify-center relative min-h-[12rem]">
        <div className="flex-grow flex flex-col items-center justify-center">
            {loading ? (
            <div className="space-y-3 w-full">
                <Skeleton className="h-5 w-3/4 mx-auto" />
                <Skeleton className="h-5 w-1/2 mx-auto" />
                <Skeleton className="h-4 w-1/4 mx-auto mt-2" />
            </div>
            ) : (
            quote && (
                <>
                <blockquote className="text-lg md:text-xl font-medium">
                    „{quote.quote}“
                </blockquote>
                <cite className="text-sm text-muted-foreground mt-3 block">
                    – {quote.author}
                </cite>
                </>
            )
            )}
        </div>
        <div className="w-full flex justify-between items-center mt-4 pt-4 border-t border-dashed">
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Wand2 className="w-3 h-3"/>
                <span>Zitat von KI ausgewählt & übersetzt</span>
            </p>
            <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8"
                onClick={fetchQuote}
                disabled={loading}
                data-cursor-interactive
                >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
        </div>
      </CardContent>
    </Card>
  );
};
