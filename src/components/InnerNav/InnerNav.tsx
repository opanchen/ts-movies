import { Link, useLocation } from "react-router-dom";
import { useLangState } from "src/hooks";
import css from "./InnerNav.module.css";

export const InnerNav: React.FC = () => {
  const location = useLocation();
  const { lang } = useLangState();

  const activeTab = location.pathname.includes("cast")
    ? "cast"
    : location.pathname.includes("reviews")
    ? "reviews"
    : location.pathname.includes("trailers")
    ? "trailers"
    : null;

  return (
    <ul className={css.list}>
      <li>
        <Link to="cast" className={css.link} data-active={activeTab === "cast"}>
          {lang === "en-US" ? "Cast" : "В ролях"}
        </Link>
      </li>

      <li>
        <Link
          to="reviews"
          className={css.link}
          data-active={activeTab === "reviews"}
        >
          {lang === "en-US" ? "Reviews" : "Рецензії"}
        </Link>
      </li>

      <li>
        <Link
          to="trailers"
          className={css.link}
          data-active={activeTab === "trailers"}
        >
          {lang === "en-US" ? "Trailer" : "Трейлер"}
        </Link>
      </li>
    </ul>
  );
};
