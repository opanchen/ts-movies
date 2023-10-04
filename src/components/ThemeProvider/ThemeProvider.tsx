import { createContext, useState } from "react";
import type { ThemeType } from "src/types";

const LS_KEY: string = "movies-ui-theme";

type ThemeContextProps = {
  theme: ThemeType;
  setTheme(x: ThemeType): void;
};

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

type Props = {
  children: React.ReactNode;
};

const getThemeFromStorage = (): ThemeType => {
  const theme: ThemeType | null = JSON.parse(
    localStorage.getItem(LS_KEY) || "null"
  );
  return theme ?? "light";
};

export const ThemeProvider = ({ children }: Props) => {
  const [mode, setMode] = useState<ThemeType>(getThemeFromStorage);

  const setTheme = (newTheme: ThemeType) => {
    setMode(newTheme);
    localStorage.setItem(LS_KEY, JSON.stringify(newTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme: mode, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
