import { useAppDispatch, useLangState } from "src/hooks";
import { addMovie } from "src/redux/operations";
import { remove } from "src/redux/moviesSlice";
import { BsBookmarkStar } from "react-icons/bs";
import { BsBookmarkX } from "react-icons/bs";
import css from "./CollectBnt.module.css";

type Props = {
  id: string | number;
  isCollected: boolean;
  isInsideCard?: boolean;
};

export const CollectBnt: React.FC<Props> = ({
  id,
  isCollected,
  isInsideCard,
}: Props) => {
  const dispatch = useAppDispatch();
  const { lang } = useLangState();

  const icon = isCollected ? (
    <BsBookmarkX className={css["icon-remove"]} size={32} />
  ) : (
    <BsBookmarkStar className={css["icon-add"]} size={32} />
  );

  const hanleClick = () => {
    isCollected ? dispatch(remove(id)) : dispatch(addMovie(id));
  };

  const collectedTextContent =
    lang === "en-US" ? "Remove from collection" : "Видалити з колекції";
  const collectTaxtContent =
    lang === "en-US" ? "Add to collection" : "Додати в колекцію";

  const textContent = isCollected ? collectedTextContent : collectTaxtContent;

  return isInsideCard ? (
    <button
      onClick={hanleClick}
      className={css["card-collect-btn"]}
      type="button"
      aria-label={textContent}
      data-collected={isCollected}
    >
      <span className={css.label}>{textContent}</span>
      {icon}
    </button>
  ) : (
    <button
      onClick={hanleClick}
      className={css["collect-btn"]}
      aria-label={textContent}
      type="button"
    >
      {textContent}
    </button>
  );
};
