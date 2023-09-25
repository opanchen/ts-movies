import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FallbackView } from "../FallbackView/FallbackView";
import { moviesAPI } from "src/services/moviesAPI";
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

  useEffect(() => {
    if (!movieId) return;

    setIsLoading(true);

    const fetchData = async () => {
      try {
        const { results } = await moviesAPI.getReviews(movieId);
        // console.log(results);

        if (!results || results.length === 0) {
          setError("There aren't reviews for this movie yet. Try again later.");
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
  }, [movieId]);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <FallbackView type="error" message={error} />}
      {reviews.length > 0 && (
        <>
          <h3 className="visually-hidden">Reviews</h3>
          <ul className={css.list}>
            {reviews.map(({ id, author, content, created_at }) => {
              const date = new Date(created_at);
              const formattedDate = date.toLocaleString();
              return (
                <li key={id} className={css.item}>
                  <h4 className={css.author}>
                    <span className={css.label}>Author: </span>
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
    </>
  );
};

export default Reviews;
