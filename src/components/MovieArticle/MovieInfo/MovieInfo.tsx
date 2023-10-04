import defaultLogo from "../../../assets/images/logo.png";
import { CircleProgressBar } from "src/components/CircleProgressBar/CircleProgressBar";
import { moviesAPI } from "src/services/moviesAPI";
import { useLangState } from "src/hooks";
import css from "./MovieInfo.module.css";

type Props = {
  title: string;
  releaseDate: string;
  vote: number;
  originalTitle: string;
  overview: string;
  tagline: string;
  genres: Array<{ id: number; name: string }>;
  countries: Array<{ name: string; [key: string]: any }>;
  companies: Array<{
    name: string;
    logo_path: string | null;
    [key: string]: any;
  }>;
  [key: string]: any;
};

export const MovieInfo: React.FC<Props> = ({
  title,
  releaseDate,
  vote,
  originalTitle,
  overview,
  tagline,
  countries,
  genres,
  companies,
  media,
}: Props) => {
  const { lang } = useLangState();

  const year: string | null = releaseDate ? releaseDate.slice(0, 4) : null;
  const genreList = genres.map(({ name }) => name).join(", ");
  const countryList = countries.map(({ name }) => name).join(", ");

  return (
    <div className={css.info}>
      <div className={css.heading}>
        <h1 className={css.title}>{title}</h1>
        {year && <p className={css.year}>({year})</p>}
      </div>
      <h2 className="visually-hidden">
        {lang === "en-US" ? "Main information" : "Основна інформація"}
      </h2>
      {tagline && (
        <p className={css.tagline}>
          &laquo;
          {tagline}&raquo;
        </p>
      )}

      <div className={css["data-box"]}>
        <div className={css["data-box-inner"]}>
          <p className={css["title-original"]}>
            <span className={css.label}>
              {lang === "en-US" ? "Original title: " : "Оригінальна назва: "}
            </span>
            {originalTitle}
          </p>
          {genreList && (
            <p className={css.genres}>
              <span className={css.label}>
                {lang === "en-US" ? "Genre: " : "Жанр: "}
              </span>
              <span className={css["genres-list"]}>{genreList}</span>
            </p>
          )}
          {releaseDate && (
            <p className={css["release-date"]}>
              <span className={css.label}>
                {lang === "en-US" ? "Release date: " : "Дата виходу: "}
              </span>
              {releaseDate}
            </p>
          )}
          {countryList && (
            <p className={css.countries}>
              <span className={css.label}>
                {lang === "en-US" ? "Country: " : "Країна: "}
              </span>
              <span className={css["genres-list"]}>{countryList}</span>
            </p>
          )}
        </div>

        <div className={css.rate} aria-label="average movie rating integer">
          <p className={`${css["rate-label"]} ${css.label}`}>
            {lang === "en-US" ? "Average rating:" : "Середня оцінка:"}
          </p>
          <CircleProgressBar
            circleWidth={media === "mobile" ? 36 : 42}
            vote={vote}
          />
        </div>
      </div>
      {overview && (
        <p className={css.descr}>
          <span className={css.label}>
            {lang === "en-US" ? "Overview: " : "Опис: "}
          </span>
          {overview}
        </p>
      )}
      {companies && companies.length > 0 && (
        <div className={css.companies}>
          <p className={`${css["companies-label"]} ${css.label}`}>
            {lang === "en-US"
              ? "Production companies: "
              : "Компанії виробники: "}
          </p>
          <ul className={css["companies-list"]}>
            {companies.map(({ name, logo_path }) => (
              <li key={name}>
                <div className={css["company-thumb"]}>
                  <img
                    src={
                      logo_path
                        ? `${moviesAPI.imgBaseURL.middle}${logo_path}`
                        : defaultLogo
                    }
                    alt={`${name} logo`}
                  />
                </div>
                <p className={css["company-name"]}>{name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
