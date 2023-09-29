import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { selectCollectionEn } from "src/redux/selectors";
import { isMovieCollected } from "src/helpers";
import { useAppSelector } from "src/hooks";
import { moviesAPI } from "src/services/moviesAPI";
import {
  BackLinkBtn,
  CollectBnt,
  Container,
  FallbackView,
  MovieArticle,
  MovieExtraInfo,
  Spinner,
} from "src/components";
import css from "./MovieDetails.module.css";

const MovieDetails: React.FC = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<{ [key: string]: any } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const collection = useAppSelector(selectCollectionEn);
  // ! Temporary use only En-collection...
  const isCollected = isMovieCollected({ id: movieId, arr: collection });
  // console.log(isCollected);

  useEffect(() => {
    if (!movieId) return;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const data = await moviesAPI.getDetails(movieId);
        // console.log(data);
        setMovie(data);
      } catch (error) {
        console.log(error);
        setError("Something went wrong... Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  return (
    <div className={css.wrapper}>
      <Container>
        <div className={css["btn-bar"]}>
          <BackLinkBtn />
          {!error && movieId && movie && (
            <CollectBnt id={movieId} isCollected={isCollected} />
          )}
        </div>
      </Container>
      {isLoading && <Spinner />}
      {error && <FallbackView type="error" message={error} />}
      {!error && movie && (
        <>
          <MovieArticle movie={movie} />
          <MovieExtraInfo />
        </>
      )}
    </div>
  );
};

export default MovieDetails;
