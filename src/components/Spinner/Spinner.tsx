import { RotatingLines } from "react-loader-spinner";
import { useWindowDimensions } from "src/hooks";
import css from "./Spinner.module.css";

export const Spinner: React.FC = () => {
  const { width } = useWindowDimensions();

  const media: "mobile" | "mobile-up" | "tablet" | "tablet-up" | "desktop" =
    width < 480
      ? "mobile"
      : width >= 480 && width < 768
      ? "mobile-up"
      : width >= 1200
      ? "desktop"
      : width >= 1040 && width < 1200
      ? "tablet-up"
      : "tablet";

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
