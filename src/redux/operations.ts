import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { moviesAPI } from "src/services/moviesAPI";
import type { Genre, Language, MovieType } from "src/types";

type AddMovieArgs = string | number;

type SetGenresResult = {
  language: Language;
  genres: Genre[];
};

type AddMovieResult = {
  id: string | number;
  "en-US": MovieType;
  "uk-UA": MovieType;
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
    const responseEn = await moviesAPI.getMovieById({
      id,
      lang: "en-US",
    });
    const responseUk = await moviesAPI.getMovieById({
      id,
      lang: "uk-UA",
    });

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
    let error: AxiosError<ValidateError> = err as any;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue({ errorMessage: error.message });
  }
});

export const setGenres = createAsyncThunk<
  SetGenresResult,
  Language,
  {
    rejectValue: ValidateError;
  }
>("movies-collection/setGenres", async (language, { rejectWithValue }) => {
  try {
    const response = await moviesAPI.getGenres(language);

    if (!response.genres) {
      return rejectWithValue({
        errorMessage: "Error inside getGenres function: no data fetched.",
      });
    }

    const obj = {
      language,
      genres: response.genres,
    };

    return obj;
  } catch (err) {
    let error: AxiosError<ValidateError> = err as any;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue({ errorMessage: error.message });
  }
});
