import { Link, useLocation } from "react-router-dom";
import { useRef } from "react";
import css from "./BackLinkBtn.module.css";

export const BackLinkBtn: React.FC = () => {
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? "/movies");

  return (
    <Link to={backLinkLocationRef.current} className={css.link}>
      Go back
    </Link>
  );
};
