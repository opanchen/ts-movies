import { useEffect, useState } from "react";
import { Container, FallbackView, MovieList, Spinner } from "src/components";
import { moviesAPI } from "src/services/moviesAPI";
import css from "./Home.module.css";
import { useLangState } from "src/hooks";

type MovieType = {
  title: string;
  original_title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  id: number;
  media_type: string;
  original_language: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  [key: string]: unknown;
};

type MoviesTrending = MovieType[] | null;

type ErrorType = any | null;

const Home: React.FC = () => {
  const [movies, setMovies] = useState<MoviesTrending>(null);
  const [error, setError] = useState<ErrorType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { lang } = useLangState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const data = await moviesAPI.getTrending();
        if (data) setMovies(data?.results);

        // console.log(data);
      } catch (error) {
        console.log(error);
        const errorMessage: string =
          lang === "en-US"
            ? "Something went wrong... Please, try again later."
            : "Щось пішло не так... Будь ласка, повторіть спробу пізніше.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [lang]);

  const headingTextContent: string =
    lang === "en-US" ? "Popular movies" : "Популярні фільми";

  return (
    <section className={css.section}>
      <Container>
        <h1 className={css.heading}>{headingTextContent}</h1>
        {isLoading && <Spinner />}
        {error && <FallbackView type="error" message={error} />}
        {movies && <MovieList movies={movies} />}
      </Container>
    </section>
  );
};

export default Home;
