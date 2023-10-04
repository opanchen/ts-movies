import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider-extra-styles.css";
import { CastCard } from "../Cast/CastCard/CastCard";
import { useWindowDimensions } from "src/hooks";
import { getMediaType } from "src/helpers";
import type { CastItemType } from "src/types";
import css from "./CastSlider.module.css";

type Props = {
  items: CastItemType[];
};

export const CastSlider: React.FC<Props> = ({ items }: Props) => {
  const { width } = useWindowDimensions();
  const media = getMediaType(width);

  let slidesToShow = 3;

  switch (media) {
    case "mobile":
      slidesToShow = 3;
      break;
    case "mobile-up":
      slidesToShow = 4;
      break;
    case "tablet":
      slidesToShow = 4;
      break;
    case "tablet-up":
      slidesToShow = 5;
      break;
    case "desktop":
      slidesToShow = 6;
      break;

    default:
      console.log("Error");
      break;
  }

  const isInfinite: boolean =
    (media === "mobile" && items.length <= 3) ||
    (media === "mobile-up" && items.length <= 4) ||
    (media === "tablet" && items.length <= 4) ||
    (media === "tablet-up" && items.length <= 5) ||
    (media === "desktop" && items.length <= 6)
      ? false
      : true;

  const settings = {
    infinite: isInfinite,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    swipeToSlide: true,
  };

  return (
    <div className={css.wrapper}>
      <Slider {...settings}>
        {items.map((item) => {
          return (
            <div key={item.id}>
              {/* <div className={css.item}> */}
              <CastCard data={item} />
              {/* </div>  */}
            </div>
          );
        })}
      </Slider>
    </div>
  );
};
