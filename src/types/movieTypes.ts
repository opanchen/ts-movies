export type MovieType = {
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
  [key: string]: any;
};

export type MovieDetailsType = {
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
  production_countries: { name: string; [key: string]: any }[];
  release_date: string;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
  [key: string]: any;
};

export type Genre = {
  id: number;
  name: string;
};

export type CastItemType = {
  name: string;
  character: string;
  known_for_department: string;
  profile_path: string;
  gender: number;
  id: number;
  [key: string]: any;
};

export type ReviewType = {
  author: string;
  content: string;
  id: number | string;
  created_at: string;
  [key: string]: any;
};

export type Video = {
  type: string;
  id: string;
  key: string;
  site: string;
  official: boolean;
  size: number;
  published_at: string;
  [key: string]: any;
};
