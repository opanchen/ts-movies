import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { moviesAPI } from "src/services/moviesAPI";
import { CastSlider, FallbackView, Spinner } from "../";
import { useLangState } from "src/hooks";
import type { CastItemType } from "src/types";
import css from "./Cast.module.css";

type CastType = Array<CastItemType> | [];

const Cast: React.FC = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState<CastType>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
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

    setIsLoading(true);

    const fetchData = async () => {
      try {
        const data = await moviesAPI.getCast({
          id: movieId,
          language: lang,
        });
        // console.log(cast);

        if (!data) throw new Error("There is no data.");

        const { cast } = data;

        const mainCast: CastType = cast?.filter(
          ({ known_for_department }: CastItemType) =>
            known_for_department === "Acting"
        );

        if (!cast || cast.length === 0 || mainCast.length === 0) {
          const errorMessage =
            lang === "en-US"
              ? "Cast of this movie wasn't found. Please try again later."
              : "Cписок ролей для даного фільму не знайдено. Будь ласка, повторіть спробу пізніше.";
          setError(errorMessage);
          return;
        }
        setCast(mainCast);
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
      <h3 className="visually-hidden">Movie cast</h3>
      {isLoading && <Spinner />}
      {error && <FallbackView type="error" message={error} />}
      {cast && cast.length !== 0 && <CastSlider items={cast} />}
    </div>
  );
};

export default Cast;
