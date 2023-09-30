import { BiError } from "react-icons/bi";
import css from "./FallbackView.module.css";
import { useLangState } from "src/hooks";

type Props = {
  message: string;
  type: "init" | "error";
};

export const FallbackView: React.FC<Props> = ({ message, type }: Props) => {
  const { lang } = useLangState();

  const warningLabelText: string = lang === "en-US" ? "Warning" : "Увага";
  const errorLabelText: string = lang === "en-US" ? "Error" : "Помилка";

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
              {type === "init" ? warningLabelText : errorLabelText}
            </p>
          </div>
          <p>{message}</p>
        </div>
        <div className={css.overlay}></div>
      </div>
    </>
  );
};
