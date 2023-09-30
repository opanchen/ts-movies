import { Link, useLocation } from "react-router-dom";
import { useRef } from "react";
import { useLangState } from "src/hooks";
import css from "./BackLinkBtn.module.css";

export const BackLinkBtn: React.FC = () => {
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? "/movies");
  const { lang } = useLangState();

  return (
    <Link to={backLinkLocationRef.current} className={css.link}>
      {lang === "en-US" ? "Go back" : "Назад"}
    </Link>
  );
};
