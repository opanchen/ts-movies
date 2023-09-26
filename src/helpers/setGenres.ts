import { moviesAPI } from "src/services/moviesAPI";

const LS_KEY = "movies-genres";

type Genre = {
  id: number;
  name: string;
};

type GenreStorage = {
  "en-US": Genre[];
};

type GenreIds = number[];

export const setGenres = async () => {
  const storage: GenreStorage | null = JSON.parse(
    localStorage.getItem(LS_KEY) || "null"
  );
  //   console.log("STORAGE: ", storage);

  if (storage) {
    // console.log("Genres are already in storage.");
    return;
  }

  const data = await moviesAPI.getGenres("en-US");

  if (!data) {
    console.log("ERROR: Empty response data from Genres function...");
    return;
  }

  //   console.log("GENRES: ", data.genres);
  const newStorageData = {
    "en-US": data.genres,
  };
  localStorage.setItem(LS_KEY, JSON.stringify(newStorageData));
  //   console.log("Updated local storage with genres data.");
};

export const getGenres = (ids: GenreIds) => {
  const storage: GenreStorage | null = JSON.parse(
    localStorage.getItem(LS_KEY) || "null"
  );

  if (!storage) {
    console.log("Storage is empty...");
    setGenres();
    return;
  }

  const res = ids
    .map((item) => {
      const genre = storage?.["en-US"].find(({ id }) => id === item);
      return genre?.name;
    })
    .slice(0, 2)
    .join(", ");

  return res;
};
