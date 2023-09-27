import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { moviesAPI } from "src/services/moviesAPI";

type MovieCardType = {
  title: string;
  original_title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  id: number;
  original_language: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  [key: string]: any;
};

type AddMovie = {
  "en-US": Partial<MovieCardType>;
  "uk-UA": Partial<MovieCardType>;
};
//   | {
//       status_code: number;
//       status_message: string;
//       success: boolean;
//     }
//   | undefined;

export const addMovie = createAsyncThunk(
  "movies-collection",
  //   async (id: string | number, { rejectWithValue }): Promise<AddMovie> => {
  async (id: string | number, { rejectWithValue }) => {
    try {
      const responseEn = await moviesAPI.getMovieById({
        id: 434343434343,
        lang: "en-US",
      });
      //   console.log("kkk");

      const responseUk = await moviesAPI.getMovieById({ id, lang: "uk-UA" });
      //   console.log("RESPONSE EN: ", responseEn);
      //   console.log("RESPONSE UK: ", responseUk);

      if (!responseEn || !responseUk) {
        console.log(
          "ERROR inside createAsynkThunk() function. Check out both server responses...  \nResponseEn: ",
          responseEn,
          "\nResponseUk:",
          responseUk
        );
        return;
      }

      const movieEn: Partial<MovieCardType> = {
        title: responseEn.title,
        original_title: responseEn.original_title,
        overview: responseEn.overview,
        backdrop_path: responseEn.backdrop_path,
        poster_path: responseEn.poster_path,
        release_date: responseEn.release_date,
        id: responseEn.id,
        media_type: "movie",
        original_language: responseEn.original_language,
        popularity: responseEn.popularity,
        vote_average: responseEn.vote_average,
        vote_count: responseEn.vote_count,
        genre_ids: responseEn.genres.map(({ id }) => id),
      };

      const movieUk: Partial<MovieCardType> = {
        title: responseUk.title,
        original_title: responseUk.original_title,
        overview: responseUk.overview,
        backdrop_path: responseUk.backdrop_path,
        poster_path: responseUk.poster_path,
        release_date: responseUk.release_date,
        id: responseUk.id,
        media_type: "movie",
        original_language: responseUk.original_language,
        popularity: responseUk.popularity,
        vote_average: responseUk.vote_average,
        vote_count: responseUk.vote_count,
        genre_ids: responseUk.genres.map(({ id }) => id),
      };
      //   console.log(",,,");

      return {
        "en-US": movieEn,
        "uk-UA": movieUk,
      };
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
