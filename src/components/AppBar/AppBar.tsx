import { LangSwitcher, Logo, MainNav, ThemeSwitcher } from "../";
import css from "./AppBar.module.css";

export const AppBar: React.FC = () => {
  return (
    <div className={css.wrapper}>
      <div className={css["logo-element"]}>
        <Logo />
      </div>
      <MainNav />
      <div className={css["buttons-bar"]}>
        <LangSwitcher />
        <ThemeSwitcher />
      </div>
    </div>
  );
};
