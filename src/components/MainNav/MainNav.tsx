import { NavLink } from "react-router-dom";
import { useLangState } from "src/hooks";
import css from "./MainNav.module.css";

export const MainNav: React.FC = () => {
  const { lang } = useLangState();

  const navLinkClassName = ({ isActive }: { isActive: boolean }): string =>
    isActive ? `${css.link} ${css.current}` : css.link;

  return (
    <nav>
      <ul className={css.wrapper}>
        <li>
          <NavLink to="/" className={navLinkClassName}>
            {lang === "en-US" ? "Home" : "Головна"}
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={navLinkClassName}>
            {lang === "en-US" ? "Movies" : "Фільми"}
          </NavLink>
        </li>

        <li>
          <NavLink to="/collection" className={navLinkClassName}>
            {lang === "en-US" ? "Collection" : "Колекція"}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
