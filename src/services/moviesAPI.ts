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
    [key: string]: unknown;
  }[];
};

const fetchTrending = async (): Promise<FetchMoviesResponse | undefined> => {
  try {
    const res = await axios.get(`/trending/movie/day?api_key=${API_KEY}`);
    return res.data;
  } catch (er) {
    console.log(er);
  }
};

const fetchMovieByQuery = async (
  query: string
): Promise<FetchMoviesResponse | undefined> => {
  try {
    const res = await axios.get(
      `/search/movie?api_key=${API_KEY}&query=${query}&include_adult=false`
    );
    return res.data;
  } catch (er) {
    console.log(er);
  }
};

const fetchMovieDetails = async (id: string | number) => {
  const fetchUrl = `/movie/${id}?api_key=${API_KEY}`;

  try {
    const res = await axios.get(fetchUrl);
    return res.data;
  } catch (er) {
    console.log(er);
  }
};

const fetchMovieCast = async (id: string | number) => {
  const fetchUrl = `/movie/${id}/credits?api_key=${API_KEY}`;

  try {
    const res = await axios.get(fetchUrl);
    return res.data;
  } catch (er) {
    console.log(er);
  }
};

const fetchMovieReviews = async (id: string | number) => {
  const fetchUrl = `/movie/${id}/reviews?api_key=${API_KEY}`;

  try {
    const res = await axios.get(fetchUrl);
    return res.data;
  } catch (er) {
    console.log(er);
  }
};

const fetchMovieVideos = async (id: string | number) => {
  const fetchUrl = `/movie/${id}/videos?api_key=${API_KEY}`;

  try {
    const res = await axios.get(fetchUrl);
    return res.data;
  } catch (er) {
    console.log(er);
  }
};

export const moviesAPI = {
  imgBaseURL,
  imgBgBaseURL,
  getTrending: fetchTrending,
  getMoviesByQuery: fetchMovieByQuery,
  getDetails: fetchMovieDetails,
  getCast: fetchMovieCast,
  getReviews: fetchMovieReviews,
  getVideos: fetchMovieVideos,
};
