import { RootState } from "./store";

export const selectCollectionEn = (state: RootState) => state.movies["en-US"];
export const selectCollectionUk = (state: RootState) => state.movies["uk-UA"];

export const selectCollectionError = (state: RootState) => state.movies.error;
export const selectCollectionIsLoading = (state: RootState) =>
  state.movies.isLoading;
