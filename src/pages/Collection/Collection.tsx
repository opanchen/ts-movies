import { useState } from "react";
import css from "./Collection.module.css";
import { useAppSelector } from "src/hooks";
import { selectCollectionEn } from "src/redux/selectors";
import { Container, MovieList } from "src/components";

// type MovieType = {
//   title: string;
//   original_title: string;
//   overview: string;
//   backdrop_path: string;
//   poster_path: string;
//   release_date: string;
//   id: number;
//   media_type: string;
//   original_language: string;
//   popularity: number;
//   vote_average: number;
//   vote_count: number;
//   genre_ids: number[];
//   [key: string]: any;
// };

// type MoviesCollection = MovieType[] | null;

const Collection: React.FC = () => {
  //   const [movies, setMovies] = useState<MoviesCollection>(null);
  //   const [error, setError] = useState<string | null>(null);
  //   const [isLoading, setIsLoading] = useState<boolean>(false);

  const movies = useAppSelector(selectCollectionEn);
  //   console.log("EN Collection: ", movies);

  return (
    <section className={css.section}>
      <Container>
        <h1 className={css.heading}>Favorite movies</h1>
        {movies.length > 0 && <MovieList movies={movies} />}
      </Container>
    </section>
  );
};

export default Collection;
