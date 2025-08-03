
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const cookieConsent = localStorage.getItem('cookie-consent');
      if (!cookieConsent) {
        setIsVisible(true);
      }
    } catch (error) {
        // If localStorage is not available, just don't show the banner.
        setIsVisible(false);
    }
  }, []);

  const handleAccept = () => {
    try {
        localStorage.setItem('cookie-consent', 'true');
    } catch (error) {
        // If localStorage is not available, do nothing.
    }
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-4 right-4 z-[100] w-full max-w-sm rounded-2xl border border-border/50 bg-background/80 p-6 shadow-2xl backdrop-blur-lg"
          data-cursor-interactive
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Cookie className="h-6 w-6 shrink-0 text-primary" />
              <h3 className="font-headline text-xl font-bold">Cookies? Nur die Nötigsten.</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Diese Website verwendet nur technisch notwendige Cookies, die nach dem Schließen der Seite sofort wieder gelöscht werden – versprochen!
            </p>
            <Button onClick={handleAccept} className="w-full rounded-full" size="lg">
              Verstanden & Akzeptiert
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
