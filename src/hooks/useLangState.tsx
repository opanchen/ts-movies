import { useContext } from "react";
import { LangContext } from "src/components";

export const useLangState = () => {
  const context = useContext(LangContext);

  if (context === undefined) {
    throw new Error("useLangState must be used within a LangProvider");
  }

  return context;
};
