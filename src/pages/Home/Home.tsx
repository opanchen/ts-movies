import { useEffect, useState } from "react";
import { Container, MovieList } from "src/components";
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
        setError(error);
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
        {isLoading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {movies && <MovieList movies={movies} />}
      </Container>
    </section>
  );
};

export default Home;
