import { useLangState } from "src/hooks";
import css from "./LangSwitcher.module.css";

export const LangSwitcher: React.FC = () => {
  const { lang, setLang } = useLangState();

  const onEnClick = () => {
    setLang("en-US");
  };

  const onUkClick = () => {
    setLang("uk-UA");
  };

  return (
    <div className={css.wrapper}>
      <button
        onClick={onEnClick}
        type="button"
        className={css.btn}
        data-active={lang === "en-US"}
        aria-label="Switch language to English"
      >
        <img
          src="http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg"
          alt="Great Britain flag"
          width={24}
          className={css.img}
        />
        <span className="visually-hidden">
          {lang === "en-US" ? "English" : "Англійська"}
        </span>
      </button>
      <button
        onClick={onUkClick}
        type="button"
        className={css.btn}
        data-active={lang === "uk-UA"}
        aria-label="Switch language to Ukrainian"
      >
        <img
          src="http://purecatamphetamine.github.io/country-flag-icons/3x2/UA.svg"
          alt="Ukrainian flag"
          width={24}
          className={css.img}
        />
        <span className="visually-hidden">
          {lang === "en-US" ? "Ukrainian" : "Українська"}
        </span>
      </button>
    </div>
  );
};
