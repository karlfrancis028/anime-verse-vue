import type { 
  AnimeGenreParams,
  SeasonUpcomingAnimeParams,
  TopAnimeParams 
} from "@/interfaces/params";
import { AnimeApi } from "@/services/anime";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAnimeStore = defineStore('anime', () => {
  const topAnimes = ref<any[]>([]);
  const seasonUpcomingAnimes = ref<any[]>([]);
  const animeGenres = ref<any[]>([]);

  const fetchTopAnimes = async (queryParams?: TopAnimeParams) => {
    try {
      const { data } = await AnimeApi.fetchTopAnimes(queryParams);
      if (data) {
        topAnimes.value = data.data;
      }
    } catch(error) {
      console.error(error);
    }
  };

  const fetchSeasonUpcomingAnimes = async (queryParams?: SeasonUpcomingAnimeParams) => {
    try {
      const { data } = await AnimeApi.fetchSeasonUpcomingAnimes(queryParams);
      if (data) {
        seasonUpcomingAnimes.value = data.data;
      }
    } catch(error) {
      console.error(error);
    }
  };

  const fetchAnimeGenres = async (queryParams?: AnimeGenreParams) => {
    try {
      const { data } = await AnimeApi.fetchAnimeGenres(queryParams);
      if (data) {
        animeGenres.value = data.data;
      }
    } catch(error) {
      console.error(error);
    }
  };

  return {
    topAnimes,
    seasonUpcomingAnimes,
    animeGenres,
    fetchTopAnimes,
    fetchSeasonUpcomingAnimes,
    fetchAnimeGenres,
  };
});