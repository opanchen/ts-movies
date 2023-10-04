import { createContext, useState } from "react";
import type { Language } from "src/types";

export const LS_KEY: string = "movies-ui-lang";

type LangContextProps = {
  lang: Language;
  setLang(newLang: Language): void;
};

export const LangContext = createContext<LangContextProps | undefined>(
  undefined
);

type Props = {
  children: React.ReactNode;
};

const getLangFromStorage = (): Language => {
  const lang: Language | null = JSON.parse(
    localStorage.getItem(LS_KEY) || "null"
  );
  return lang ?? "en-US";
};

export const LanguageProvider = ({ children }: Props) => {
  const [mode, setMode] = useState<Language>(getLangFromStorage);

  const setLang = (newLang: Language) => {
    setMode(newLang);
    localStorage.setItem(LS_KEY, JSON.stringify(newLang));
  };

  return (
    <LangContext.Provider value={{ lang: mode, setLang }}>
      {children}
    </LangContext.Provider>
  );
};
