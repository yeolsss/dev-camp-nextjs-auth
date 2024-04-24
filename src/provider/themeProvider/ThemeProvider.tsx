"use client";

import { ThemeProvider as NextThemesProviderProps } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProviderProps {...props}>{children}</NextThemesProviderProps>
  );
}

export default ThemeProvider;
