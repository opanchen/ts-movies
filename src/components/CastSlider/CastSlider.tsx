import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider-extra-styles.css";
import css from "./CastSlider.module.css";
import { CastCard } from "../Cast/CastCard/CastCard";
import { useWindowDimensions } from "src/hooks";

type CastItemType = {
  name: string;
  character: string;
  known_for_department: string;
  profile_path: string;
  gender: number;
  id: number;
  [key: string]: any;
};

type Props = {
  items: CastItemType[];
};

export const CastSlider: React.FC<Props> = ({ items }: Props) => {
  const { width } = useWindowDimensions();

  //   console.log(items);

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

  const settings = {
    // dots: true,
    infinite: true,
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
