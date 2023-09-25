import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FallbackView, Spinner, VideoPlayer } from "../";
import { moviesAPI } from "src/services/moviesAPI";
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
          setError(
            "There aren't trailers for this movie yet. Try again later."
          );
          return;
        }

        // console.log(trailers);
        setTrailers(trailers);
      } catch (error) {
        console.log(error);
        setError("Something went wrong... Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  return (
    <>
      {isLoading && <Spinner />}
      {error && <FallbackView type="error" message={error} />}
      {trailers.length > 0 && (
        <div className={css["trailers-container"]}>
          <h3 className="visually-hidden">Trailers</h3>
          <VideoPlayer data={trailers} />
        </div>
      )}
    </>
  );
};

export default Trailers;
