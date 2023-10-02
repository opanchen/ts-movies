import { useEffect, useState } from "react";
import {
  Container,
  FallbackView,
  LoadMoreBtn,
  MovieList,
  Spinner,
} from "src/components";
import { moviesAPI } from "src/services/moviesAPI";
import { useLangState } from "src/hooks";
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
  genre_ids: number[];
  [key: string]: unknown;
};

type MoviesTrending = MovieType[];

type ErrorType = any | null;

const Home: React.FC = () => {
  const [movies, setMovies] = useState<MoviesTrending>([]);
  const [error, setError] = useState<ErrorType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { lang } = useLangState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setIsLoading(true);

        const data = await moviesAPI.getTrending({ language: lang, page });

        if (!data) throw new Error("There is no fetched data.");

        const { results, total_pages } = data;

        setMovies((prevMovies) => {
          // Additional filter-operation to prevent response movie-items duplication inside main array:
          const filteredResults = results.filter((item) => {
            return prevMovies.map(({ id }) => id).indexOf(item.id) === -1;
          });

          return [...prevMovies, ...filteredResults];
        });

        if (totalPages !== total_pages) setTotalPages(totalPages);

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
  }, [lang, page, totalPages]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const headingTextContent: string =
    lang === "en-US" ? "Popular movies" : "Популярні фільми";

  return (
    <section className={css.section}>
      <Container>
        <h1 className={css.heading}>{headingTextContent}</h1>
        {isLoading && <Spinner />}
        {error && <FallbackView type="error" message={error} />}
        {!error && movies.length > 0 && (
          <>
            <MovieList movies={movies} />
            {page !== totalPages && (
              <LoadMoreBtn onLoadMore={handleLoadMore} isLoading={isLoading} />
            )}
          </>
        )}
      </Container>
    </section>
  );
};

export default Home;
