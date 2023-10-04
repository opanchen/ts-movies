import defaultPoster from "../../assets/images/defaultPoster.jpg";
import { moviesAPI } from "src/services/moviesAPI";
import { Container, MovieInfo } from "../";
import { useWindowDimensions } from "src/hooks";
import { getMediaType } from "src/helpers";
import type { MovieDetailsType } from "src/types";
import css from "./MovieArticle.module.css";

type Props = {
  movie: MovieDetailsType;
};

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
  const media = getMediaType(width);

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
                <img className={css.poster} src={img} alt={`${title} poster`} />
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
