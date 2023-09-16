import { createContext, useState } from "react";

type ThemeMode = "light" | "dark";

type ThemeContextProps = {
  theme: ThemeMode;
  setTheme: React.Dispatch<React.SetStateAction<ThemeMode>>;
};

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<ThemeMode>("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
