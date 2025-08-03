
'use client';

import { useEffect, useState } from 'react';

type ThemeColor = 'red' | 'green' | 'blue';

export const useThemeColor = () => {
  const [themeColor, setThemeColorState] = useState<ThemeColor>('red');

  useEffect(() => {
    const storedThemeColor = localStorage.getItem('theme-color') as ThemeColor;
    if (storedThemeColor) {
      setThemeColorState(storedThemeColor);
      document.documentElement.setAttribute('data-theme-color', storedThemeColor);
    }
  }, []);

  const setThemeColor = (color: ThemeColor) => {
    setThemeColorState(color);
    localStorage.setItem('theme-color', color);
    document.documentElement.setAttribute('data-theme-color', color);
  };

  return { themeColor, setThemeColor };
};
