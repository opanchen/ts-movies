import { useAppSelector, useLangState } from "src/hooks";
import { selectCollectionEn } from "src/redux/selectors";
import { Container, FallbackView, MovieList } from "src/components";
import css from "./Collection.module.css";

const Collection: React.FC = () => {
  const { lang } = useLangState();

  const movies = useAppSelector(selectCollectionEn);
  //   console.log("EN Collection: ", movies);

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
          <MovieList movies={movies} />
        ) : (
          <FallbackView type="init" message={errorMessage} />
        )}
      </Container>
    </section>
  );
};

export default Collection;
