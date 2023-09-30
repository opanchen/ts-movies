import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FallbackView, Spinner } from "../";
import { moviesAPI } from "src/services/moviesAPI";
import { useLangState } from "src/hooks";
import css from "./Reviews.module.css";

type Review = {
  author: string;
  content: string;
  id: number;
  created_at: string;
  [key: string]: any;
};

export const Reviews: React.FC = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState<Review[]>([]);
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

    setIsLoading(true);

    const fetchData = async () => {
      try {
        const { results } = await moviesAPI.getReviews(movieId);
        // console.log(results);

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
      {reviews.length > 0 && (
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
