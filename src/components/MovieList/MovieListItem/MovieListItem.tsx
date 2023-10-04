import defaultPoster from "../../../assets/images/defaultPoster.jpg";
import { moviesAPI } from "src/services/moviesAPI";
import { Link, useLocation } from "react-router-dom";
import { CircleProgressBar, CollectBnt } from "src/components";
import { getGenres, isMovieCollected } from "src/helpers";
import { useAppSelector, useLangState } from "src/hooks";
import {
  selectCollectionEn,
  selectGenresEn,
  selectGenresUk,
} from "src/redux/selectors";
import { MovieType } from "src/types";
import css from "./MovieListItem.module.css";

type Props = Partial<MovieType>;

export const MovieListItem: React.FC<Props> = ({
  poster,
  name,
  title,
  releaseDate,
  commonDate,
  vote,
  id,
  genre_ids,
}: Props) => {
  const location = useLocation();
  const collection = useAppSelector(selectCollectionEn);
  const isCollected = isMovieCollected({ id, arr: collection });
  const isCollectionPage = location.pathname.endsWith("/collection");
  const { lang } = useLangState();

  const genresUk = useAppSelector(selectGenresUk);
  const genresEn = useAppSelector(selectGenresEn);

  const posterPath: string = poster
    ? `${moviesAPI.imgBaseURL.middle}${poster}`
    : defaultPoster;

  const year: string =
    releaseDate || commonDate ? (releaseDate || commonDate).slice(0, 4) : "";

  const genres =
    !genre_ids || genre_ids.length === 0
      ? null
      : lang === "en-US"
      ? getGenres({ ids: genre_ids, fullArr: genresEn })
      : getGenres({ ids: genre_ids, fullArr: genresUk });
  // console.log("Item genres: ", genres);

  return (
    <div className={css.wrapper}>
      <Link to={`/movies/${id}`} state={{ from: location }}>
        <article className={css.card}>
          <div className={css.thumb}>
            <img
              loading="lazy"
              src={posterPath}
              alt={`${title} poster`}
              className={css.image}
              width={420}
            />
            {!isCollectionPage && (
              <div className={css.rate}>
                <CircleProgressBar
                  //   percentage={60}
                  vote={vote}
                  circleWidth={48}
                />
              </div>
            )}
          </div>

          <div className={css.info}>
            <h2 className={css.title}>{title || name}</h2>

            {genres && typeof genres === "string" ? (
              <p className={css["info-text"]}>
                {year !== "" && (
                  <>
                    <span className={css.year}>{year} </span> &#124;
                  </>
                )}{" "}
                {genres}
              </p>
            ) : (
              <p className={css["info-text"]}>
                <span className={css.year}>{year}</span>
              </p>
            )}
          </div>
        </article>
      </Link>
      {id && (
        <CollectBnt isInsideCard={true} isCollected={isCollected} id={id} />
      )}
    </div>
  );
};
