import axios from "axios";
import type {
  CastItemType,
  Genre,
  Language,
  MovieDetailsType,
  MovieType,
  ReviewType,
  Video,
} from "src/types";

const API_KEY = "ef2f22bb4de9529af845b70082225b5a";
const imgBaseURL = {
  middle: "https://image.tmdb.org/t/p/w500",
  large: "https://image.tmdb.org/t/p/w780",
};

const imgBgBaseURL = {
  middle: "https://image.tmdb.org/t/p/w1000_and_h450_multi_faces",
  large: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces",
};

axios.defaults.baseURL = "https://api.themoviedb.org/3";

type FetchMoviesResponse = {
  page: number;
  total_pages: number;
  total_results: number;
  results: MovieType[];
};

type FetchGenresResponse = {
  genres: Genre[];
};

type FetchCastResponse = {
  id: number;
  cast: CastItemType[];
  [key: string]: any;
};

type FetchReviewResponse = {
  id: number;
  page: number;
  results: ReviewType[];
  total_pages: number;
  total_results: number;
};

type FetchVideoResponse = {
  id: number;
  results: Video[];
  [key: string]: any;
};

const fetchTrending = async ({
  language,
  page,
}: {
  language: Language;
  page: number;
}): Promise<FetchMoviesResponse | undefined> => {
  try {
    const res = await axios.get(
      `/trending/movie/day?api_key=${API_KEY}&language=${language}&page=${page}`
    );
    // console.log(res.data);

    return res.data;
  } catch (er) {
    console.log(er);
  }
};

const fetchGenres = async (
  language: Language
): Promise<FetchGenresResponse> => {
  const res = await axios.get(
    `/genre/movie/list?api_key=${API_KEY}&language=${language}`
  );
  return res.data;
};

const fetchMovieByQuery = async ({
  query,
  language,
  page,
}: {
  query: string;
  language: Language;
  page: number;
}): Promise<FetchMoviesResponse | undefined> => {
  try {
    const res = await axios.get(
      `/search/movie?api_key=${API_KEY}&query=${query}&include_adult=false&language=${language}&page=${page}`
    );
    return res.data;
  } catch (er) {
    console.log(er);
  }
};

const fetchMovieDetails = async ({
  id,
  language,
}: {
  id: string | number;
  language: Language;
}): Promise<MovieDetailsType | undefined> => {
  const fetchUrl = `/movie/${id}?api_key=${API_KEY}&language=${language}`;

  try {
    const res = await axios.get(fetchUrl);
    // console.log(res.data);x
    return res.data;
  } catch (er) {
    console.log(er);
  }
};

const fetchMovieCast = async ({
  id,
  language,
}: {
  id: number | string;
  language: Language;
}): Promise<FetchCastResponse | undefined> => {
  const fetchUrl = `/movie/${id}/credits?api_key=${API_KEY}&language=${language}`;

  try {
    const res = await axios.get(fetchUrl);
    // console.log(res);

    return res.data;
  } catch (er) {
    console.log(er);
  }
};

const fetchMovieReviews = async ({
  id,
  language,
}: {
  id: number | string;
  language: Language;
}): Promise<FetchReviewResponse | undefined> => {
  const fetchUrl = `/movie/${id}/reviews?api_key=${API_KEY}&language=${language}`;

  try {
    const res = await axios.get(fetchUrl);
    // console.log(res.data);

    return res.data;
  } catch (er) {
    console.log(er);
  }
};

const fetchMovieVideos = async ({
  id,
  language,
}: {
  id: number | string;
  language: Language;
}): Promise<FetchVideoResponse | undefined> => {
  const fetchUrl = `/movie/${id}/videos?api_key=${API_KEY}&language=${language}`;

  try {
    const res = await axios.get(fetchUrl);
    // console.log(res);

    if (language === "uk-UA" && res.data?.results.length === 0) {
      const extraRes = await axios.get(
        `/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      return extraRes.data;
    }

    return res.data;
  } catch (er) {
    console.log(er);
  }
};

const fetchMovieById = async ({
  id,
  lang,
}: {
  id: string | number;
  lang: Language;
}): Promise<MovieDetailsType> => {
  const fetchUrl = `/movie/${id}?api_key=${API_KEY}&language=${lang}`;
  const res = await axios.get(fetchUrl);
  return res.data;
};

export const moviesAPI = {
  imgBaseURL,
  imgBgBaseURL,
  getGenres: fetchGenres,
  getTrending: fetchTrending,
  getMoviesByQuery: fetchMovieByQuery,
  getDetails: fetchMovieDetails,
  getCast: fetchMovieCast,
  getReviews: fetchMovieReviews,
  getVideos: fetchMovieVideos,
  getMovieById: fetchMovieById,
};
