import React from "react";
import css from "./MovieList.module.css";
import { MovieListItem } from "./MovieListItem/MovieListItem";

type Props = {
  movies: MovieType[];
};

type MovieType = {
  title: string;
  original_title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  id: number;
  media_type: string;
  original_language: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  [key: string]: unknown;
};

export const MovieList: React.FC<Props> = ({ movies }: Props) => {
  console.log(movies[0]);
  //   const {
  // id,
  // poster_path: poster,
  // name,
  // title,
  // release_date: releaseDate,
  // first_air_date: commonDate,
  //   } = movies[0];

  return (
    <>
      <ul className={css.list}>
        {movies.map(
          ({
            id,
            poster_path: poster,
            name,
            title,
            release_date: releaseDate,
            first_air_date: commonDate,
            vote_average: vote,
          }) => (
            <li key={id} className={css.item}>
              <MovieListItem
                id={id}
                poster={poster}
                name={name}
                title={title}
                releaseDate={releaseDate}
                commonDate={commonDate}
                vote={vote}
              />
              {/* <p>{id}</p>
            <p>{title}</p> */}
            </li>
          )
        )}
      </ul>
    </>
  );
  //   return (
  //     <>
  //       <div>
  //         <MovieListItem
  //           //   key={id}
  //           id={id}
  //           poster={poster}
  //           name={name}
  //           title={title}
  //           releaseDate={releaseDate}
  //           commonDate={commonDate}
  //         />
  //       </div>
  //     </>
  //   );
};
