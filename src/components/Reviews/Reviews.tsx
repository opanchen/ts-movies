import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FallbackView, Spinner } from "../";
import { moviesAPI } from "src/services/moviesAPI";
import { useLangState } from "src/hooks";
import type { ReviewType } from "src/types";
import css from "./Reviews.module.css";

export const Reviews: React.FC = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { lang } = useLangState();

  useEffect(() => {
    const handleScroll = async () => {
      setTimeout(
        () =>
          window.scrollTo({
            top: 500,
            behavior: "smooth",
          }),
        1000
      );
    };

    handleScroll();
  }, []);

  useEffect(() => {
    if (!movieId) return;

    setError(null);
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const data = await moviesAPI.getReviews({
          id: movieId,
          language: lang,
        });

        if (!data) throw new Error("There is no data.");

        const { results } = data;

        if (!results || results.length === 0) {
          const errorMessage =
            lang === "en-US"
              ? "There aren't reviews for this movie yet. Try again later."
              : "Наразі рецензії на даний фільм відсутні. Повторіть спробу пізніше.";
          setError(errorMessage);
          return;
        }

        setReviews(results);
      } catch (error) {
        console.log(error);
        const errorMessage =
          lang === "en-US"
            ? "Something went wrong... Please try again later."
            : "Щось пішло не так... Будь ласка, повторіть спробу пізніше.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [lang, movieId]);

  return (
    <div className={css.wrapper}>
      {isLoading && <Spinner />}
      {error && <FallbackView type="error" message={error} />}
      {!error && reviews.length > 0 && (
        <>
          <h3 className="visually-hidden">
            {lang === "en-US" ? "Reviews" : "Рецензії"}
          </h3>
          <ul className={css.list}>
            {reviews.map(({ id, author, content, created_at }) => {
              const date = new Date(created_at);
              const formattedDate = date.toLocaleString();
              return (
                <li key={id} className={css.item}>
                  <h4 className={css.author}>
                    <span className={css.label}>
                      {lang === "en-US" ? "Author: " : "Автор: "}
                    </span>
                    {author}
                  </h4>
                  <p className={css.text}>{content}</p>
                  <p className={css.date}>{formattedDate}</p>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default Reviews;
