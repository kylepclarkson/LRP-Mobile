import { VariableContextProvider, useColorScheme } from "nativewind";
import React from "react";

export const lightTheme = {
  "--color-primary": "47 93 80",
  "--color-primary-foreground": "255 255 255",

  "--color-accent": "196 122 58",
  "--color-accent-foreground": "255 255 255",

  "--color-background": "247 245 242",

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

const bumblebee = {
  "--color-base-100": "255 255 255",
  "--color-base-200": " 247 247 247",
  "--color-base-300": "235 235 235",
  "--color-base-content": "52 52 52",

  "--color-primary": "255 214 0",
  "--color-primary-content": "107 92 63",

  "--color-secondary": "255 170 0",
  "--color-secondary-content": "112 78 46",

  "--color-accent": "0 0 0",
  "--color-accent-content": "255 255 255",

  "--color-neutral": "94 94 92",
  "--color-neutral-content": "235 235 234",

  "--color-info": "0 149 255",
  "--color-info-content": "0 73 140",
  "--color-success": "0 181 108",
  "--color-success-content": "0 88 55",
  "--color-warning": "255 187 0",
  "--color-warning-content": "115 78 37",
  "--color-error": "255 85 56",
  "--color-error-content": "140 47 33",
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : bumblebee;

  return (
    <VariableContextProvider value={theme}>
      {children}
    </VariableContextProvider>
  );
}
