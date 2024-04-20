import axios from 'axios';
import type { 
  AnimeGenreParams,
  BaseAnimeParams,
  SeasonUpcomingAnimeParams,
  TopAnimeParams, 
} from '@/interfaces/params';
import type{ 
  AnimeGenreResponse,
  SeasonUpcomingAnimeResponse,
  TopAnimeResponse, 
} from '@/interfaces/responses';

const ANIME_API = `https://api.jikan.moe/v4`;

export const AnimeApi = {
  fetchAnimeByNameAndGenre: async (queryParams?: BaseAnimeParams) => {
    return await axios.get(`${ANIME_API}/anime`, {
      params: queryParams,
    });
  },
  fetchTopAnimes: async (queryParams?: TopAnimeParams) => {
    return await axios.get<TopAnimeResponse>(`${ANIME_API}/top/anime`, {
      params: queryParams,
    });
  },
  fetchSeasonUpcomingAnimes: async (queryParams?: SeasonUpcomingAnimeParams) => {
    return await axios.get<SeasonUpcomingAnimeResponse>(`${ANIME_API}/seasons/upcoming`, {
      params: queryParams,
    });
  },
  fetchAnimeGenres: async (queryParams?: AnimeGenreParams) => {
    return await axios.get<AnimeGenreResponse>(`${ANIME_API}/genres/anime`, {
      params: queryParams,
    });
  },
};