import { useThemeState } from "../../hooks";
import css from "./ThemeSwitcher.module.css";

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useThemeState();

  const onSwitcherClick = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <>
      <button className={css.button} type="button" onClick={onSwitcherClick}>
        <p>theme:</p>
        <p>{theme}</p>
      </button>
    </>
  );
};
