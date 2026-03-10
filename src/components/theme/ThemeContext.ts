import { createContext } from "react";

export const ThemeValues = {
  DARK: "dark",
  LIGHT: "light",
  SYSTEM: "system",
} as const;

export type Theme = (typeof ThemeValues)[keyof typeof ThemeValues];

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);
