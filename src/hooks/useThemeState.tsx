import { useContext } from "react";
import { ThemeContext } from "../components";

export const useThemeState = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useThemeState must be used within a ThemeProvider");
  }

  return context;
};
