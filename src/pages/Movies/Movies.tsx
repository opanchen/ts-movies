import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLangState } from "src/hooks";
import { moviesAPI } from "src/services/moviesAPI";
import {
  Container,
  FallbackView,
  MovieList,
  SearchForm,
  Spinner,
} from "src/components";
import css from "./Movies.module.css";

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

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { lang } = useLangState();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");

  const onSearchFormSubmit = (query: string) => {
    setError(null);
    setSearchParams({ query });
  };

  useEffect(() => {
    if (!query) return;

    const loadMovies = async () => {
      setIsLoading(true);

      try {
        const data = await moviesAPI.getMoviesByQuery({
          query,
          language: lang,
        });
        // console.log(data);

        if (!data || data.results.length === 0) {
          const errorMessage =
            lang === "en-US"
              ? "Movies with this query weren't found. Please enter valid query and try again!"
              : "Фільмів за даним запитом не знайдено. Будь ласка, введіть валідний запит та спробуйте знову!";
          setError(errorMessage);
          return;
        }

        setMovies(data.results);
      } catch (error) {
        console.log(error);
        const errorMessage =
          lang === "en-US"
            ? "Something went wrong. Please try again later!"
            : "Щось пішло не так... Будь ласка, повторіть спробу пізніше!";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, [lang, query]);

  const defaultFallbackMessage: string =
    lang === "en-US"
      ? "There are no movies yet. Enter your query to find some..."
      : "Наразі фільми відсутні. Введіть Ваш запит для пошуку...";

  return (
    <section className={css.section}>
      <Container>
        <h1 className="visually-hidden">
          {lang === "en-US" ? "Search movies" : "Пошук фільмів"}
        </h1>
        <div className={css["form-wrapper"]}>
          <SearchForm onSubmit={onSearchFormSubmit} />
        </div>
        {isLoading && <Spinner />}
        {error && <FallbackView type="error" message={error} />}
        {!error && movies.length === 0 && (
          <FallbackView type="init" message={defaultFallbackMessage} />
        )}
        {!error && movies.length !== 0 && <MovieList movies={movies} />}
      </Container>
    </section>
  );
};

export default Movies;
