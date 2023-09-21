import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { moviesAPI } from "src/services/moviesAPI";
import { CastSlider } from "../";
import css from "./Cast.module.css";

type CastItemType = {
  name: string;
  character: string;
  known_for_department: string;
  profile_path: string;
  gender: number;
  id: number;
  [key: string]: any;
};

type CastType =
  | Array<CastItemType>
  // | Array<CastItemType[]>
  | [];

const Cast: React.FC = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState<CastType>([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchData = async () => {
      try {
        const data = await moviesAPI.getCast(movieId);
        // console.log(data.cast);
        // console.log(cast);
        setCast(data.cast);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };

    fetchData();
  }, [movieId]);

  return (
    <div className={css.wrapper}>
      <h3 className="visually-hidden">Movie cast</h3>
      {cast && cast.length !== 0 && <CastSlider items={cast} />}
    </div>
  );
};

export default Cast;
