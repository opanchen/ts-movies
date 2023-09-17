import { useThemeState } from "../../hooks";
import { BsFillSunFill } from "react-icons/bs";
import { BsFillMoonStarsFill } from "react-icons/bs";
import css from "./ThemeSwitcher.module.css";

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useThemeState();

  const onSwitcherClick = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const icon =
    theme === "light" ? (
      <BsFillSunFill size={20} />
    ) : (
      <BsFillMoonStarsFill size={20} />
    );

  return (
    <>
      <button className={css.button} type="button" onClick={onSwitcherClick}>
        {icon}
      </button>
    </>
  );
};
