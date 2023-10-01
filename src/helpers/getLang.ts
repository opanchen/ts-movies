import { LS_KEY } from "src/components/LanguageProvider/LanguageProvider";

// helper-function to use outside tsx-components instead of useLangState() hook
export const getLang = () => {
  try {
    const lang: "en-US" | "uk-UA" | null = JSON.parse(
      localStorage.getItem(LS_KEY) || "null"
    );

    if (!lang || lang === undefined) return "en-US";

    return lang;
  } catch (error) {
    console.log(error);
  }
};
