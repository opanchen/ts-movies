import { useLangState } from "src/hooks";
import { SpinnerMini } from "../Spinner/SpinnerMini/SpinnerMini";
import css from "./LoadMoreBtn.module.css";

type Props = {
  onLoadMore(): void;
  isLoading: boolean;
};

export const LoadMoreBtn: React.FC<Props> = ({
  onLoadMore,
  isLoading,
}: Props) => {
  const { lang } = useLangState();

  const handleScroll = async () => {
    setTimeout(
      () =>
        window.scrollBy({
          top: 400,
          behavior: "smooth",
        }),
      1000
    );
  };

  const onButtonClick = async () => {
    onLoadMore();
    await handleScroll();
  };

  const textContent = lang === "en-US" ? "Load more" : "Показати більше";
  const loadingTextContent =
    lang === "en-US" ? "Loading... " : "Завантаження... ";

  return (
    <div className={css.wrapper}>
      <button
        className={css.button}
        type="button"
        onClick={onButtonClick}
        aria-label={textContent}
      >
        {isLoading ? (
          <>
            {loadingTextContent}
            <SpinnerMini />
          </>
        ) : (
          textContent
        )}
      </button>
    </div>
  );
};
