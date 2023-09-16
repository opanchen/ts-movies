import { Logo, MainNav, ThemeSwitcher } from "../";
import css from "./AppBar.module.css";

export const AppBar: React.FC = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.inner}>
        <Logo />
        <ThemeSwitcher />
      </div>

      <MainNav />
    </div>
  );
};
