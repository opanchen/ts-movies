import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import type { RootState } from "./store";
import { addMovie } from "./operations";

type MovieItem = {
  title: string;
  original_title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  id: number;
  genre_ids: number[];
  [key: string]: any;
};

interface MoviesState {
  "en-US": MovieItem[];
  "uk-UA": MovieItem[];
  isLoading: boolean;
  error: null | string | undefined;
}

const initialState: MoviesState = {
  "en-US": [],
  "uk-UA": [],
  isLoading: false,
  error: null,
};

export const moviesSlice = createSlice({
  name: "movies-collection",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addMovie.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        // console.log("ACTION: ", action);
        console.log("PAYLOAD: ", payload);

        const existentItemEn = state["en-US"].find(
          ({ id }) => id.toString() === payload.id.toString()
        );
        const existentItemUk = state["uk-UA"].find(
          ({ id }) => id.toString() === payload.id.toString()
        );

        if (existentItemEn || existentItemUk) {
          return alert("Already exists in your collection");
        }

        state["en-US"].push(payload["en-US"]);
        state["uk-UA"].push(payload["uk-UA"]);
      })
      .addCase(addMovie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.isLoading = false;
        console.log("rj-ACTION: ", action);
        console.log("rj-PAYLOAD: ", action.payload);
        state.error = action.payload?.errorMessage;
      });
  },
});

const persistConfig = {
  key: "movies-collection",
  storage,
};

export const moviesReducer = persistReducer(persistConfig, moviesSlice.reducer);
