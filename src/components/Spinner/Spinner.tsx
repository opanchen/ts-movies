import { RotatingLines } from "react-loader-spinner";
import { useWindowDimensions } from "src/hooks";
import { getMediaType } from "src/helpers";
import css from "./Spinner.module.css";

export const Spinner: React.FC = () => {
  const { width } = useWindowDimensions();
  const media = getMediaType(width);

  const iconWidth: number =
    media === "mobile" || media === "mobile-up" ? 48 : 96;

  return (
    <div className={css.wrapper}>
      <RotatingLines
        strokeColor="#008080"
        strokeWidth="5"
        animationDuration="0.75"
        width={iconWidth.toString()}
        visible={true}
      />
    </div>
  );
};
