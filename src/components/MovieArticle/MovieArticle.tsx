import defaultPoster from "../../assets/images/defaultPoster.jpg";

import { moviesAPI } from "src/services/moviesAPI";
import css from "./MovieArticle.module.css";
import { Container, MovieInfo } from "../";
import { useWindowDimensions } from "src/hooks";

type Props = {
  [key: string]: any;
};

//   title: string;
//   date: string;
//   vote: number;
//   originalTitle: string;
//   overview: string;
//   tagline: string;
//   genres: Array<{ id: number; name: string }>;
//   countries: Array<{ name: string; [key: string]: any }>;
//   [key: string]: any;

export const MovieArticle: React.FC<Props> = ({ movie }: Props) => {
  const {
    title,
    original_title: originalTitle,
    tagline,
    overview,
    release_date: releaseDate,
    genres,
    poster_path: poster,
    backdrop_path: backdrop,
    vote_average: vote,
    production_countries: countries,
    production_companies: companies,
  } = movie;

  const { width } = useWindowDimensions();
  const media: "mobile" | "mobile-up" | "tablet" | "desktop" =
    width < 480
      ? "mobile"
      : width >= 480 && width < 768
      ? "mobile-up"
      : width >= 1200
      ? "desktop"
      : "tablet";
  //   console.log(width);

  const bgImage =
    media === "mobile"
      ? `${moviesAPI.imgBgBaseURL.middle}${backdrop}`
      : `${moviesAPI.imgBgBaseURL.large}${backdrop}`;

  const img = !poster
    ? defaultPoster
    : media === "mobile"
    ? `${moviesAPI.imgBaseURL.middle}${poster}`
    : `${moviesAPI.imgBaseURL.large}${poster}`;

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
              {media !== "mobile" && media !== "mobile-up" && (
                <MovieInfo
                  title={title}
                  originalTitle={originalTitle}
                  tagline={tagline}
                  overview={overview}
                  releaseDate={releaseDate}
                  vote={vote}
                  countries={countries}
                  companies={companies}
                  genres={genres}
                />
              )}
            </div>
          </Container>
        </div>
      </div>
      {(media === "mobile" || media === "mobile-up") && (
        <Container>
          <MovieInfo
            title={title}
            originalTitle={originalTitle}
            tagline={tagline}
            overview={overview}
            releaseDate={releaseDate}
            vote={vote}
            countries={countries}
            companies={companies}
            genres={genres}
            media={media}
          />
        </Container>
      )}
    </article>
  );
};
