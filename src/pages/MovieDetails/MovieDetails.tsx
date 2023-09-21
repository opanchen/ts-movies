import { useEffect, useState } from "react";
import {
  // useLocation,
  useParams,
} from "react-router-dom";
import { MovieArticle, MovieExtraInfo } from "src/components";
import { moviesAPI } from "src/services/moviesAPI";

const MovieDetails: React.FC = () => {
  const { movieId } = useParams();
  // const location = useLocation();

  const [movie, setMovie] = useState<{ [key: string]: any } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!movieId) return;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const data = await moviesAPI.getDetails(movieId);
        // console.log(data);
        setMovie(data);
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
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {movie && (
        <>
          <MovieArticle movie={movie} />
          <MovieExtraInfo />
        </>
      )}
    </>
  );
};

export default MovieDetails;
