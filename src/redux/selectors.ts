import { RootState } from "./store";

export const selectCollectionEn = (state: RootState) =>
  state.movies.collection["en-US"];
export const selectCollectionUk = (state: RootState) =>
  state.movies.collection["uk-UA"];

export const selectCollectionError = (state: RootState) => state.movies.error;
export const selectCollectionIsLoading = (state: RootState) =>
  state.movies.isLoading;

export const selectGenresEn = (state: RootState) =>
  state.movies.genres["en-US"];
export const selectGenresUk = (state: RootState) =>
  state.movies.genres["uk-UA"];
export const selectAllGenres = (state: RootState) => state.movies.genres;
