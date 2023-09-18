import axios from "axios";
const API_KEY = "ef2f22bb4de9529af845b70082225b5a";
const imgBaseURL = "https://image.tmdb.org/t/p/w500";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

type TrendingResponse = {
  page: number;
  total_pages: number;
  total_results: number;
  results: [
    {
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
    }
  ];
};

const fetchTrending = async (): Promise<TrendingResponse | undefined> => {
  try {
    const res = await axios.get(`/trending/all/day?api_key=${API_KEY}`);
    return res.data;
  } catch (er) {
    console.log(er);
  }
};

export const moviesAPI = {
  imgBaseURL,
  getTrending: fetchTrending,
};
