import defaultPoster from "../../../assets/images/defaultPoster.jpg";
import { moviesAPI } from "src/services/moviesAPI";
import { Link, useLocation } from "react-router-dom";
import { CircleProgressBar } from "src/components";
import css from "./MovieListItem.module.css";

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
}: Props) => {
  const location = useLocation();

  const posterPath: string = poster
    ? `${moviesAPI.imgBaseURL.middle}${poster}`
    : defaultPoster;
  //   const posterPath = defaultPoster;

  const year: string =
    releaseDate || commonDate ? (releaseDate || commonDate).slice(0, 4) : "";

  return (
    <>
      <Link to={`/movies/${id}`} state={{ from: location }}>
        <article className={css.card}>
          <div className={css.thumb}>
            <img
              loading="lazy"
              src={posterPath}
              alt={`${title} poster`}
              className={css.image}
            />
            <div className={css.rate}>
              <CircleProgressBar
                //   percentage={60}
                vote={vote}
                circleWidth={48}
              />
            </div>
          </div>

          <div className={css.info}>
            <h2 className={css.title}>{title || name}</h2>
            <p className={css.year}>{year}</p>
          </div>
        </article>
      </Link>
    </>
  );
};
