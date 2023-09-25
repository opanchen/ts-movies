import { useEffect, useState } from "react";
import { Container, FallbackView, MovieList, Spinner } from "src/components";
import { moviesAPI } from "src/services/moviesAPI";
import css from "./Home.module.css";

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

type MoviesTrending = MovieType[] | null;

type ErrorType = any | null;

const Home: React.FC = () => {
  const [movies, setMovies] = useState<MoviesTrending>(null);
  const [error, setError] = useState<ErrorType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const data = await moviesAPI.getTrending();
        if (data) setMovies(data?.results);

        // console.log(data);
      } catch (error) {
        console.log(error);
        setError("Something went wrong... Please, try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className={css.section}>
      <Container>
        <h1 className={css.heading}>Popular movies</h1>
        {isLoading && <Spinner />}
        {error && <FallbackView type="error" message={error} />}
        {movies && <MovieList movies={movies} />}
      </Container>
    </section>
  );
};

export default Home;
