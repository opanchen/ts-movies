import defaultPoster from "../../../assets/images/defaultPoster.jpg";
import { moviesAPI } from "src/services/moviesAPI";
import { Link, useLocation } from "react-router-dom";
import { CircleProgressBar, CollectBnt } from "src/components";
import css from "./MovieListItem.module.css";
import { getGenres, isMovieCollected } from "src/helpers";
import { useAppSelector } from "src/hooks";
import { selectCollectionEn } from "src/redux/selectors";

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
  [key: string]: any;
};

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

  const posterPath: string = poster
    ? `${moviesAPI.imgBaseURL.middle}${poster}`
    : defaultPoster;

  const year: string =
    releaseDate || commonDate ? (releaseDate || commonDate).slice(0, 4) : "";

  const genres =
    !genre_ids || genre_ids.length === 0 ? null : getGenres(genre_ids);
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
