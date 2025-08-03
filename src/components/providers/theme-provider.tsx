"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"
import { useThemeColor } from "@/hooks/use-theme-color"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  useThemeColor();
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
