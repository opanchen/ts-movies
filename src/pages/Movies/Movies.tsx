import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, MovieList, SearchForm } from "src/components";
import { moviesAPI } from "src/services/moviesAPI";
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
  [key: string]: unknown;
};

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
        const data = await moviesAPI.getMoviesByQuery(query);
        console.log(data);

        if (!data || data.results.length === 0) {
          setError(
            "Movies with this query weren't found. Please enter valid query and try again!"
          );
          return;
        }

        setMovies(data.results);
      } catch (error) {
        console.log(error);
        setError("Something went wrong. Please try again later!");
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, [query]);

  return (
    <section className={css.section}>
      <Container>
        <h1 className="visually-hidden">Search movies</h1>
        <div className={css["form-wrapper"]}>
          <SearchForm onSubmit={onSearchFormSubmit} />
        </div>
        {isLoading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {movies.length !== 0 && <MovieList movies={movies} />}
      </Container>
    </section>
  );
};

export default Movies;
