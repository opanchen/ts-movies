import { Link } from "react-router-dom";
import logoPng from "../../assets/images/logo.png";

import css from "./Logo.module.css";

export const Logo: React.FC = () => {
  return (
    <Link to="/">
      <div className={css["logo-wrapper"]}>
        <div className={css.thumb}>
          <img
            className={css["logo-img"]}
            src={logoPng}
            alt="logo"
            width={72}
            height={72}
          />
        </div>
        <p className={css.label}>cinema</p>
      </div>
    </Link>
  );
};
