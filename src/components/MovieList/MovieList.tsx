import React from "react";
import { MovieListItem } from "./MovieListItem/MovieListItem";
import { MovieType } from "src/types";
import css from "./MovieList.module.css";

type Props = {
  movies: MovieType[];
};

export const MovieList: React.FC<Props> = ({ movies }: Props) => {
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
            genre_ids,
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
                genre_ids={genre_ids}
              />
            </li>
          )
        )}
      </ul>
    </>
  );
};
