import { useAppSelector, useLangState } from "src/hooks";
import { selectCollectionEn, selectCollectionUk } from "src/redux/selectors";
import {
  Container,
  FallbackView,
  LoadMoreBtn,
  MovieList,
} from "src/components";
import css from "./Collection.module.css";
import { useMemo, useState } from "react";

const Collection: React.FC = () => {
  const { lang } = useLangState();
  const [page, setPage] = useState<number>(1);

  const moviesEn = useAppSelector(selectCollectionEn);
  const moviesUk = useAppSelector(selectCollectionUk);
  const movies = lang === "en-US" ? moviesEn : moviesUk;
  //   console.log("EN Collection: ", movies);

  const perPage: number = 20;
  const totalPages: number = Math.ceil(movies.length / perPage);

  const filteredMovies = useMemo(() => {
    const firstIndex = 0;
    const lastIndex = page * perPage - 1;
    return movies.slice(firstIndex, lastIndex + 1);
  }, [movies, page]);
  // console.log("first index: ", firstIndex);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const headingTextContent: string =
    lang === "en-US" ? "Favorite movies" : "Улюблені фільми";

  const errorMessage: string =
    lang === "en-US"
      ? "There are no movies yet. Go to another page and choose some movies to complete the collection."
      : "Збережені фільми відсутні. Відвідайте іншу сторінку та оберіть декілька фільмів, щоб поповнити колекцію.";

  return (
    <section className={css.section}>
      <Container>
        <h1 className={css.heading}>{headingTextContent}</h1>
        {movies.length > 0 ? (
          <>
            <MovieList movies={filteredMovies} />
            {page !== totalPages && (
              <LoadMoreBtn onLoadMore={handleLoadMore} isLoading={false} />
            )}
          </>
        ) : (
          <FallbackView type="init" message={errorMessage} />
        )}
      </Container>
    </section>
  );
};

export default Collection;