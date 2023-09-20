import { Link, useLocation } from "react-router-dom";
import css from "./InnerNav.module.css";

export const InnerNav: React.FC = () => {
  const location = useLocation();
  console.log(location);

  const activeTab = location.pathname.includes("cast")
    ? "cast"
    : location.pathname.includes("reviews")
    ? "reviews"
    : null;

  return (
    <ul className={css.list}>
      <li>
        <Link to="cast" className={css.link} data-active={activeTab === "cast"}>
          Cast
        </Link>
      </li>
      <li>
        <Link
          to="reviews"
          className={css.link}
          data-active={activeTab === "reviews"}
        >
          Reviews
        </Link>
      </li>
    </ul>
  );
};
