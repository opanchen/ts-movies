import { ImSpinner3 } from "react-icons/im";
import css from "./SpinnerMini.module.css";

export const SpinnerMini: React.FC = () => {
  return (
    // <div>
    <ImSpinner3 color="#008080" className={css["icon-spin"]} size={12} />
    // </div>
  );
};
