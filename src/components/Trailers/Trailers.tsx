import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FallbackView, Spinner, VideoPlayer } from "../";
import { moviesAPI } from "src/services/moviesAPI";
import { useLangState } from "src/hooks";
import type { Video } from "src/types";
import css from "./Trailers.module.css";

const Trailers: React.FC = () => {
  const { movieId } = useParams();
  const [trailers, setTrailers] = useState<Video[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { lang } = useLangState();

  useEffect(() => {
    const handleScroll = async () => {
      setTimeout(
        () =>
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          }),
        1000
      );
    };

    handleScroll();
  }, []);

  useEffect(() => {
    if (!movieId) return;

    const fetchData = async () => {
      setError(null);
      setIsLoading(true);

      try {
        const videoRes = await moviesAPI.getVideos({
          id: movieId,
          language: lang,
        });

        if (!videoRes) throw new Error("There is no data.");

        const trailers = videoRes.results.filter(
          ({ type, site }) =>
            type === "Trailer" && site.toLowerCase() === "youtube"
        );

        const teasers = videoRes.results.filter(
          ({ type, site }) =>
            type === "Teaser" && site.toLowerCase() === "youtube"
        );

        if (!trailers || trailers.length === 0) {
          if (teasers && teasers.length > 0) {
            setTrailers(teasers);
            return;
          }

          const errorMessage =
            lang === "en-US"
              ? "There aren't trailers for this movie yet. Try again later."
              : "Наразі трейлери до цього фільму відсутні. Повторіть спробу пізніше.";
          setError(errorMessage);
          return;
        }

        setTrailers(trailers);
      } catch (error) {
        console.log(error);
        const errorMessage =
          lang === "en-US"
            ? "Something went wrong... Please try again later."
            : "Щось пішло не так... Будь ласка, повторіть спробу пізніше.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [lang, movieId]);

  return (
    <div className={css.wrapper}>
      {isLoading && <Spinner />}
      {error && <FallbackView type="error" message={error} />}
      {!error && trailers.length > 0 && (
        <div className={css["trailers-container"]}>
          <h3 className="visually-hidden">
            {lang === "en-US" ? "Trailers" : "Трейлери"}
          </h3>
          <VideoPlayer data={trailers} />
        </div>
      )}
    </div>
  );
};

export default Trailers;
