import { Link } from "react-router-dom";
import { RiMovie2Line } from "react-icons/ri";
import css from "./Logo.module.css";

export const Logo: React.FC = () => {
  return (
    <Link to="/">
      <div className={css["logo-wrapper"]}>
        <div className={css.thumb}>
          <RiMovie2Line className={css.icon} size={32} />
        </div>
        <p className={css.label}>cinema</p>
      </div>
    </Link>
  );
};
