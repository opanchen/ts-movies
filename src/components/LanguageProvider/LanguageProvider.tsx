import { createContext, useState } from "react";

const LS_KEY: string = "movies-ui-lang";

type LangMode = "en-US" | "uk-UA";

type LangContextProps = {
  lang: LangMode;
  setLang(newLang: LangMode): void;
};

export const LangContext = createContext<LangContextProps | undefined>(
  undefined
);

type Props = {
  children: React.ReactNode;
};

const getLangFromStorage = (): LangMode => {
  const lang: LangMode | null = JSON.parse(
    localStorage.getItem(LS_KEY) || "null"
  );
  return lang ?? "en-US";
};

export const LanguageProvider = ({ children }: Props) => {
  const [mode, setMode] = useState<LangMode>(getLangFromStorage);

  const setLang = (newLang: LangMode) => {
    setMode(newLang);
    localStorage.setItem(LS_KEY, JSON.stringify(newLang));
  };

  return (
    <LangContext.Provider value={{ lang: mode, setLang }}>
      {children}
    </LangContext.Provider>
  );
};
