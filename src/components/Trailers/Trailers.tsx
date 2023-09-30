import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FallbackView, Spinner, VideoPlayer } from "../";
import { moviesAPI } from "src/services/moviesAPI";
import { useLangState } from "src/hooks";
import css from "./Trailers.module.css";

type Video = {
  type: string;
  id: string;
  key: string;
  site: string;
  official: boolean;
  size: number;
  published_at: string;
  [key: string]: any;
};

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
      setIsLoading(true);

      try {
        const videoRes: { id: number; results: Video[] } =
          await moviesAPI.getVideos(movieId);
        // console.log(videoRes);

        const trailers = videoRes.results.filter(
          ({ type, site }) =>
            type === "Trailer" && site.toLowerCase() === "youtube"
        );

        if (!trailers || trailers.length === 0) {
          const errorMessage =
            lang === "en-US"
              ? "There aren't trailers for this movie yet. Try again later."
              : "Наразі трейлери до цього фільму відсутні. Повторіть спробу пізніше.";
          setError(errorMessage);
          return;
        }

        // console.log(trailers);
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
      {trailers.length > 0 && (
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
