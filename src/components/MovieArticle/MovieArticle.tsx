import { moviesAPI } from "src/services/moviesAPI";
import css from "./MovieArticle.module.css";
import { Container, MovieInfo } from "../";
import { useWindowDimensions } from "src/hooks";

type Props = {
  [key: string]: any;
};

export const MovieArticle: React.FC<Props> = ({ movie }: Props) => {
  const {
    title,
    overview,
    release_date: releaseDate,
    genres,
    poster_path: poster,
    backdrop_path: backdrop,
    vote_average: vote,
  } = movie;

  const { width } = useWindowDimensions();
  const media: "mobile" | "tablet" | "desktop" =
    width < 480 ? "mobile" : width >= 1200 ? "desktop" : "tablet";
  //   console.log(width);

  const year: string = releaseDate ? releaseDate.slice(0, 4) : "";

  const bgImage =
    media === "mobile"
      ? `${moviesAPI.imgBgBaseURL.middle}${backdrop}`
      : `${moviesAPI.imgBgBaseURL.large}${backdrop}`;

  const bgOverlay =
    "linear - gradient(rgba(47, 48, 58, 0.4), rgba(47, 48, 58, 0.4))";

  const img = `${moviesAPI.imgBaseURL}${poster}`;

  return (
    <article className={css.article}>
      <div
        className={css.backdrop}
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <div className={css.overlay}>
          <Container>
            <div className={css["backdrop-inner"]}>
              <div className={css.thumb}>
                <img className={css.poster} src={img} alt="" />
              </div>
              {media !== "mobile" && <MovieInfo />}
            </div>
          </Container>
        </div>
      </div>
      {media === "mobile" && (
        <Container>
          {/* <div className={css.info}>
          <h1 className={css.title}>{title}</h1>
          {year !== "" && <p className={css.year}>{year}</p>}
        </div> */}
          <MovieInfo />
        </Container>
      )}
    </article>
  );
};
