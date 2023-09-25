import { BiError } from "react-icons/bi";
import css from "./FallbackView.module.css";

type Props = {
  message: string;
  type: "init" | "error";
};

export const FallbackView: React.FC<Props> = ({ message, type }: Props) => {
  return (
    <>
      <div className={css["fallback-wrapper"]}>
        <div className={css.message}>
          <div className={css.heading}>
            <BiError
              size={40}
              color={type === "init" ? "#ff9747" : "#a60909"}
            />
            <p
              className={css.label}
              style={{ color: type === "init" ? "#ff9747" : "#a60909" }}
            >
              {type === "init" ? "Warning:" : "Error:"}
            </p>
          </div>
          <p>{message}</p>
        </div>
        <div className={css.overlay}></div>
      </div>
    </>
  );
};
