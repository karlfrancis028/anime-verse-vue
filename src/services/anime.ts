import axios from 'axios';
import type { 
  TopAnimeParams, 
} from '@/interfaces/params';
import type { 
  TopAnimeResponse, 
} from '@/interfaces/responses';

const ANIME_API = `https://api.jikan.moe/v4`;

export const AnimeApi = {
  fetchAllAnime: () => {
    return axios.get(`${ANIME_API}/anime`);
  },
  fetchTopAnimes: (queryParams?: TopAnimeParams) => {
    return axios.get<TopAnimeResponse>(`${ANIME_API}/top/anime`, {
      params: queryParams,
    });
  },
};