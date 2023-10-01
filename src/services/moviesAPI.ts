import axios from "axios";
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
  results: {
    title: string;
    original_title: string;
    overview: string;
    backdrop_path: string;
    poster_path: string;
    release_date: string;
    id: number;
    media_type: string;
    original_language: string;
    popularity: number;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
    [key: string]: unknown;
  }[];
};

type MovieDetails = {
  adult: false;
  backdrop_path: string;
  genres: { id: number; name: string }[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: { name: string; [key: string]: any };
  release_date: string;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
  [key: string]: any;
};

type Language = "en-US" | "uk-UA";

type Genre = {
  id: number;
  name: string;
};

type FetchGenresResponse = {
  genres: Genre[];
};

const fetchTrending = async ({
  language,
}: {
  language: Language;
}): Promise<FetchMoviesResponse | undefined> => {
  try {
    const res = await axios.get(
      `/trending/movie/day?api_key=${API_KEY}&language=${language}`
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
}: {
  query: string;
  language: Language;
}): Promise<FetchMoviesResponse | undefined> => {
  try {
    const res = await axios.get(
      `/search/movie?api_key=${API_KEY}&query=${query}&include_adult=false&language=${language}`
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
}) => {
  const fetchUrl = `/movie/${id}?api_key=${API_KEY}&language=${language}`;

  try {
    const res = await axios.get(fetchUrl);
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
}) => {
  const fetchUrl = `/movie/${id}/credits?api_key=${API_KEY}&language=${language}`;

  try {
    const res = await axios.get(fetchUrl);
    console.log(res);

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
}) => {
  const fetchUrl = `/movie/${id}/reviews?api_key=${API_KEY}&language=${language}`;

  try {
    const res = await axios.get(fetchUrl);
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
}) => {
  const fetchUrl = `/movie/${id}/videos?api_key=${API_KEY}&language=${language}`;

  try {
    const res = await axios.get(fetchUrl);
    console.log(res);

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
}): Promise<MovieDetails> => {
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
