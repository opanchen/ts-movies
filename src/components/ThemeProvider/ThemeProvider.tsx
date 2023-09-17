import { createContext, useState } from "react";

const LS_KEY: string = "movies-ui-theme";

type ThemeMode = "light" | "dark";

type ThemeContextProps = {
  theme: ThemeMode;
  setTheme(x: ThemeMode): void;
};

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

type Props = {
  children: React.ReactNode;
};

const getThemeFromStorage = (): ThemeMode => {
  const theme: ThemeMode | null = JSON.parse(
    localStorage.getItem(LS_KEY) || "null"
  );
  return theme ?? "light";
};

export const ThemeProvider = ({ children }: Props) => {
  const [mode, setMode] = useState<ThemeMode>(getThemeFromStorage);

  const setTheme = (newTheme: ThemeMode) => {
    setMode(newTheme);
    localStorage.setItem(LS_KEY, JSON.stringify(newTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme: mode, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
