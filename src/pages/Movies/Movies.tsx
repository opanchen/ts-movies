import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLangState } from "src/hooks";
import { moviesAPI } from "src/services/moviesAPI";
import { Helmet } from "react-helmet";
import {
  Container,
  FallbackView,
  LoadMoreBtn,
  MovieList,
  SearchForm,
  Spinner,
} from "src/components";
import { toast } from "react-toastify";
import type { MovieType } from "src/types";
import css from "./Movies.module.css";

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalResults, setTotalResults] = useState<number>(0);
  const { lang } = useLangState();
  const isLoadingMore = useRef(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");

  const cleanState = () => {
    setMovies([]);
    setPage(1);
    setTotalPages(0);
    setTotalResults(0);
    setError(null);
  };

  const onSearchFormSubmit = (query: string) => {
    cleanState();
    setSearchParams({ query });
  };

  useEffect(() => {
    if (!query) return;

    const loadMovies = async () => {
      try {
        setError(null);
        setIsLoading(true);

        const resultsArr: MovieType[] = [];

        for (let i = 0; i < page; i += 1) {
          const data = await moviesAPI.getMoviesByQuery({
            query,
            language: lang,
            page: i + 1,
          });
          // if (!data) throw new Error("There is no fetched data.");
          if (!data || data.results.length === 0) {
            const errorMessage =
              lang === "en-US"
                ? "Movies with this query weren't found. Please enter valid query and try again!"
                : "Фільмів за даним запитом не знайдено. Будь ласка, введіть валідний запит та спробуйте знову!";
            setError(errorMessage);
            return;
          }

          if (totalPages !== data.total_pages) setTotalPages(data.total_pages);

          if (totalResults !== data.total_results) {
            const message =
              lang === "en-US"
                ? `Number of successful search results: ${data.total_results}!`
                : `Кількість успішних результатів пошуку: ${data.total_results}!`;

            toast.success(message);
            setTotalResults(data.total_results);
          }

          resultsArr.push(...data.results);
          // console.log(`Fetch operation for page ${i + 1}...`);
        }

        // Additional filter-operation to prevent response movie-items duplication inside main array:
        setMovies((prevMovies) => {
          // case of first fetch (component did mount):
          if (prevMovies.length === 0) return resultsArr;

          // case of ui-language change with the same search query:
          const uniqueIds = resultsArr
            .map(({ id }) => id)
            .filter((id, index, array) => array.indexOf(id) === index);
          const uniqueResults = uniqueIds.map((uniqueId) => {
            const singleItem = resultsArr.find(({ id }) => id === uniqueId);
            return singleItem ? singleItem : resultsArr[0];
          });

          return uniqueResults;
        });
        // console.log("Movies have been updated.");
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

    const loadMoreMovies = async () => {
      try {
        setError(null);
        setIsLoading(true);

        const data = await moviesAPI.getMoviesByQuery({
          query,
          language: lang,
          page,
        });
        // console.log(data);

        if (!data || data.results.length === 0) {
          throw new Error("There is no fetched data.");
        }

        const { results, total_pages, total_results } = data;

        setMovies((prevMovies) => {
          // Additional filter-operation to prevent response movie-items duplication inside main array:
          const filteredResults = results.filter((item) => {
            return prevMovies.map(({ id }) => id).indexOf(item.id) === -1;
          });

          return [...prevMovies, ...filteredResults];
        });

        if (totalPages !== total_pages) setTotalPages(total_pages);

        if (totalResults !== total_results) {
          const message =
            lang === "en-US"
              ? `Number of successful search results: ${total_results}!`
              : `Кількість успішних результатів пошуку: ${total_results}!`;

          toast.success(message);
          setTotalResults(total_results);
        }
      } catch (error) {
        console.log(error);
        const errorMessage =
          lang === "en-US"
            ? "Something went wrong. Please try again later!"
            : "Щось пішло не так... Будь ласка, повторіть спробу пізніше!";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
        isLoadingMore.current = false;
      }
    };

    // Determine which dependency array variable causes server request: 'loading more' operation or UI-language change.
    isLoadingMore.current === false ? loadMovies() : loadMoreMovies();

    // const loadMovies = async () => {
    //   setIsLoading(true);

    //   try {
    //     const data = await moviesAPI.getMoviesByQuery({
    //       query,
    //       language: lang,
    //       page,
    //     });
    //     // console.log(data);

    //     if (!data || data.results.length === 0) {
    //       const errorMessage =
    //         lang === "en-US"
    //           ? "Movies with this query weren't found. Please enter valid query and try again!"
    //           : "Фільмів за даним запитом не знайдено. Будь ласка, введіть валідний запит та спробуйте знову!";
    //       setError(errorMessage);
    //       return;
    //     }

    //     const { results, total_pages, total_results } = data;

    //     setMovies((prevMovies) => {
    //       // Additional filter-operation to prevent response movie-items duplication inside main array:
    //       const filteredResults = results.filter((item) => {
    //         return prevMovies.map(({ id }) => id).indexOf(item.id) === -1;
    //       });

    //       return [...prevMovies, ...filteredResults];
    //     });

    //     if (totalPages !== total_pages) setTotalPages(total_pages);

    //     if (totalResults !== total_results) {
    //       const message =
    //         lang === "en-US"
    //           ? `Number of successful search results: ${total_results}!`
    //           : `Кількість успішних результатів пошуку: ${total_results}!`;

    //       toast.success(message);
    //       setTotalResults(total_results);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     const errorMessage =
    //       lang === "en-US"
    //         ? "Something went wrong. Please try again later!"
    //         : "Щось пішло не так... Будь ласка, повторіть спробу пізніше!";
    //     setError(errorMessage);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // loadMovies();
  }, [lang, page, query, totalPages, totalResults]);

  const handleLoadMore = () => {
    isLoadingMore.current = true;
    setPage((prevPage) => prevPage + 1);
  };

  const defaultFallbackMessage: string =
    lang === "en-US"
      ? "There are no movies yet. Enter your query to find some..."
      : "Наразі фільми відсутні. Введіть Ваш запит для пошуку...";

  return (
    <>
      <Helmet>
        <title>{lang === "en-US" ? "Movies" : "Фільми"}</title>
      </Helmet>

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
          {!error && movies.length > 0 && (
            <>
              <MovieList movies={movies} />
              {page !== totalPages && (
                <LoadMoreBtn
                  onLoadMore={handleLoadMore}
                  isLoading={isLoading}
                />
              )}
            </>
          )}
        </Container>
      </section>
    </>
  );
};

export default Movies;
