import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { addMovie, setGenres } from "./operations";
import { toast } from "react-toastify";
import { getLang } from "src/helpers";
import type { Genre, MovieType } from "src/types";

type MoviesState = {
  collection: {
    "en-US": MovieType[];
    "uk-UA": MovieType[];
  };
  genres: {
    "en-US": Genre[];
    "uk-UA": Genre[];
  };
  isLoading: boolean;
  error: null | string | undefined;
};

const initialState: MoviesState = {
  collection: {
    "en-US": [],
    "uk-UA": [],
  },
  genres: {
    "en-US": [],
    "uk-UA": [],
  },
  isLoading: false,
  error: null,
};

export const moviesSlice = createSlice({
  name: "movies-collection",
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<number | string>) => {
      const indexEn = state.collection["en-US"].findIndex(
        ({ id }) => id.toString() === action.payload.toString()
      );
      const indexUk = state.collection["uk-UA"].findIndex(
        ({ id }) => id.toString() === action.payload.toString()
      );

      if (indexEn === -1 || indexUk === -1) {
        return alert("Error: this movie isn't collected.");
      }

      state.collection["en-US"].splice(indexEn, 1);
      state.collection["uk-UA"].splice(indexUk, 1);

      getLang() === "en-US"
        ? toast.success(
            "The movie has been successfully removed from your collection!"
          )
        : toast.success("Фільм було успішно видалено з Вашої колекції!");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addMovie.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;

        const existentItemEn = state.collection["en-US"].find(
          ({ id }) => id.toString() === payload.id.toString()
        );
        const existentItemUk = state.collection["uk-UA"].find(
          ({ id }) => id.toString() === payload.id.toString()
        );

        if (existentItemEn || existentItemUk) {
          return alert("Already exists in your collection");
        }

        state.collection["en-US"].push(payload["en-US"]);
        state.collection["uk-UA"].push(payload["uk-UA"]);

        getLang() === "en-US"
          ? toast.success(
              "The movie has been successfully added to your collection!"
            )
          : toast.success("Фільм було успішно додано до Вашої колекції!");
      })
      .addCase(addMovie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.errorMessage;

        getLang() === "en-US"
          ? toast.error("Something went wrong... Try again later!")
          : toast.error("Щось пішло не так... Повторіть спробу пізніше!");
      })
      .addCase(setGenres.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.genres[payload.language] = payload.genres;
      })
      .addCase(setGenres.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload?.errorMessage;
      })
      .addCase(setGenres.pending, (state) => {
        state.isLoading = true;
      });
  },
});

const persistConfig = {
  key: "movies-collection",
  storage,
};

export const { remove } = moviesSlice.actions;
export const moviesReducer = persistReducer(persistConfig, moviesSlice.reducer);
