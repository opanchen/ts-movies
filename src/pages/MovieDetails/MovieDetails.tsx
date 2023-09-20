import { useEffect, useState } from "react";
import {
  // useLocation,
  useParams,
} from "react-router-dom";
import { MovieArticle } from "src/components";
import { moviesAPI } from "src/services/moviesAPI";

const MovieDetails: React.FC = () => {
  const { movieId } = useParams();
  // const location = useLocation();

  const [movie, setMovie] = useState<{ [key: string]: any } | null>(null);
  // const [error, setError] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const fetchData = async () => {
      try {
        const data = await moviesAPI.getDetails(movieId);
        // console.log(data);
        setMovie(data);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };

    fetchData();
  }, [movieId]);

  return (
    <>
      {movie && (
        <>
          <MovieArticle movie={movie} />
        </>
      )}
      {/* <div>Page with single movie & details...</div> */}
    </>
  );
};

export default MovieDetails;
