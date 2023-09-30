import { moviesAPI } from "src/services/moviesAPI";

const LS_KEY = "movies-genres";

type Genre = {
  id: number;
  name: string;
};

type GenreStorage = {
  "en-US": Genre[];
  "uk-UA": Genre[];
};

type GenreIds = number[];

export const setGenres = async (language: "en-US" | "uk-UA") => {
  const storage: GenreStorage | null = JSON.parse(
    localStorage.getItem(LS_KEY) || "null"
  );
  //   console.log("STORAGE: ", storage);

  if (storage && storage[language]) {
    console.log("Genres are already in storage.");
    return;
  }

  const data = await moviesAPI.getGenres(language);

  if (!data) {
    console.log("ERROR: Empty response data from Genres function...");
    return;
  }

  //   console.log("GENRES: ", data.genres);
  const newStorageData = storage
    ? {
        ...storage,
        [language]: data.genres,
      }
    : { [language]: data.genres };
  localStorage.setItem(LS_KEY, JSON.stringify(newStorageData));
  //   console.log("Updated local storage with genres data.");
};

export const getGenres = ({
  ids,
  language,
}: {
  ids: GenreIds;
  language: "en-US" | "uk-UA";
}) => {
  const storage: GenreStorage | null = JSON.parse(
    localStorage.getItem(LS_KEY) || "null"
  );

  if (!storage || !storage[language]) {
    console.log("Storage is empty...");
    setGenres(language);
    return;
  }

  const res = ids
    .map((item) => {
      const genre = storage?.[language].find(({ id }) => id === item);
      return genre?.name;
    })
    .slice(0, 2)
    .join(", ");

  return res;
};
