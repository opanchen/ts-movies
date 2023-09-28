import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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
  //   [key: string]: any;
};

type AddMovieArgs = string | number;

type AddMovieResult = {
  id: string | number;
  "en-US": MovieCardType;
  "uk-UA": MovieCardType;
};

type ValidateError = {
  errorMessage: string;
  [key: string]: any;
};

export const addMovie = createAsyncThunk<
  AddMovieResult,
  AddMovieArgs,
  {
    rejectValue: ValidateError;
  }
>("movies-collection/add", async (id, { rejectWithValue }) => {
  try {
    // 1.
    const responseEn = await moviesAPI.getMovieById({
      id,
      //   id: 434343434343,
      lang: "en-US",
    });
    const responseUk = await moviesAPI.getMovieById({
      id,
      lang: "uk-UA",
    });

    //   console.log("RESPONSE EN: ", responseEn);
    //   console.log("RESPONSE UK: ", responseUk);

    if (!responseUk.status || !responseEn.status) {
      return rejectWithValue({
        errorMessage: "Error",
      });
    }

    const movieEn = {
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

    const movieUk = {
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

    const obj = {
      id,
      "en-US": movieEn,
      "uk-UA": movieUk,
    };

    return obj;
  } catch (err) {
    // console.log("err: ", err);

    let error: AxiosError<ValidateError> = err as any;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue({ errorMessage: error.message });
  }
});
