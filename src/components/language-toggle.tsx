'use client';

import { useI18n } from '@/components/providers/i18n-provider';
import { cn } from '@/lib/utils';

export function LanguageToggle() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center gap-1 text-xs">
      <button
        onClick={() => setLocale('de')}
        className={cn(
          'px-2 py-1 transition-colors',
          locale === 'de' 
            ? 'text-foreground font-medium' 
            : 'text-muted-foreground hover:text-foreground'
        )}
        aria-label="Deutsch"
      >
        DE
      </button>
      <span className="text-muted-foreground">/</span>
      <button
        onClick={() => setLocale('en')}
        className={cn(
          'px-2 py-1 transition-colors',
          locale === 'en' 
            ? 'text-foreground font-medium' 
            : 'text-muted-foreground hover:text-foreground'
        )}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
