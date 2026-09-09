'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import de from '@/i18n/de.json';
import en from '@/i18n/en.json';

type Locale = 'de' | 'en';
type Translations = typeof de;

interface I18nContextType {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
}

const translations: Record<Locale, Translations> = { de, en };

const I18nContext = createContext<I18nContextType | undefined>(undefined);

function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'de';
  
  const stored = localStorage.getItem('locale') as Locale;
  if (stored && (stored === 'de' || stored === 'en')) return stored;
  
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('en')) return 'en';
  return 'de';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('de');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLocaleState(detectLocale());
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
    document.documentElement.lang = newLocale;
  };

  const value = {
    locale,
    t: mounted ? translations[locale] : translations.de,
    setLocale,
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
