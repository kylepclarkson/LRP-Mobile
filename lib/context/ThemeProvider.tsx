import { VariableContextProvider, useColorScheme } from "nativewind";
import React from "react";

export const lightTheme = {
  "--color-primary": "47 93 80",
  "--color-primary-foreground": "255 255 255",
  "--color-accent": "196 122 58",
  "--color-accent-foreground": "255 255 255",
  "--color-background": "#F7F5F2",
  "--color-surface": "255 255 255",
  "--color-surface-foreground": "26 26 26",
  "--color-border": "217 212 204",
  "--color-muted": "110 106 101",
  "--color-success": "60 122 74",
  "--color-warning": "223 175 58",
  "--color-error": "184 58 58",
  "--color-info": "58 110 165",
};

export const darkTheme = {
  "--color-primary": "76 138 120",
  "--color-primary-foreground": "255 255 255",
  "--color-accent": "224 165 106",
  "--color-accent-foreground": "26 26 26",
  "--color-background": "26 28 26",
  "--color-surface": "36 38 36",
  "--color-surface-foreground": "242 242 242",
  "--color-border": "58 61 58",
  "--color-muted": "168 168 168",
  "--color-success": "79 175 111",
  "--color-warning": "244 200 74",
  "--color-error": "216 92 92",
  "--color-info": "90 140 194",
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { colorScheme, setColorScheme } = useColorScheme();
  return (
    <VariableContextProvider value={colorScheme === 'dark' ? darkTheme : lightTheme}>
      {children}
    </VariableContextProvider>
  )
}