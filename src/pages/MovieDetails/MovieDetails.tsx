import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { selectCollectionEn } from "src/redux/selectors";
import { isMovieCollected } from "src/helpers";
import { useAppSelector, useLangState } from "src/hooks";
import { moviesAPI } from "src/services/moviesAPI";
import { Helmet } from "react-helmet";
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
  const { lang } = useLangState();

  const collection = useAppSelector(selectCollectionEn);
  // ! Temporary use only En-collection...
  const isCollected = isMovieCollected({ id: movieId, arr: collection });
  // console.log(isCollected);

  useEffect(() => {
    if (!movieId) return;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const data = await moviesAPI.getDetails({
          id: movieId,
          language: lang,
        });
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
  }, [lang, movieId]);

  return (
    <>
      <Helmet>
        <title>{lang === "en-US" ? "Movie details" : "Деталі фільму"}</title>
      </Helmet>

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
    </>
  );
};

export default MovieDetails;
