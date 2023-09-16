import { NavLink } from "react-router-dom";
import css from "./MainNav.module.css";

export const MainNav: React.FC = () => {
  const navLinkClassName = ({ isActive }: { isActive: boolean }): string =>
    isActive ? `${css.link} ${css.current}` : css.link;

  return (
    <nav>
      <ul className={css.wrapper}>
        <li>
          <NavLink to="/" className={navLinkClassName}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={navLinkClassName}>
            Movies
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/fav"
            className={navLinkClassName}
            style={{ pointerEvents: "none" }} // !!!!!!!!
          >
            Collection
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
