import type { 
  AnimeEpisodesParams,
  AnimeGenreParams,
  BaseAnimeParams,
  SeasonUpcomingAnimeParams,
  TopAnimeParams 
} from "@/interfaces/params";
import { AnimeApi } from "@/services/anime";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useLoadingStore } from "./loading";

export const useAnimeStore = defineStore('anime', () => {
  const topAnimes = ref<any[]>([]);
  const seasonUpcomingAnimes = ref<any[]>([]);
  const animeGenres = ref<any[]>([]);
  const { toggleLoadingState } = useLoadingStore();

  const fetchTopAnimes = async (queryParams?: TopAnimeParams) => {
    toggleLoadingState(true);
    try {
      const { data } = await AnimeApi.fetchTopAnimes(queryParams);
      if (data) {
        topAnimes.value = data.data;
      }
    } catch(error) {
      console.error(error);
    } finally {
      toggleLoadingState(false);
    }
  };

  const fetchSeasonUpcomingAnimes = async (queryParams?: SeasonUpcomingAnimeParams) => {
    toggleLoadingState(true);
    try {
      const { data } = await AnimeApi.fetchSeasonUpcomingAnimes(queryParams);
      if (data) {
        seasonUpcomingAnimes.value = data.data;
      }
    } catch(error) {
      console.error(error);
    } finally {
      toggleLoadingState(false);
    }
  };

  // const fetchAnimeGenres = async (queryParams?: AnimeGenreParams) => {
  //   toggleLoadingState(true);
  //   try {
  //     const { data } = await AnimeApi.fetchAnimeGenres(queryParams);
  //     if (data) {
  //       animeGenres.value = data.data;
  //     }
  //   } catch(error) {
  //     console.error(error);
  //   } finally {
  //     toggleLoadingState(false);
  //   }
  // };

  const fetchAnimeByNameAndGenre = async (queryParams?: BaseAnimeParams) => {
    toggleLoadingState(true);
    try {
      const { data } = await AnimeApi.fetchAnimeByNameAndGenre(queryParams);
      if (data) return data.data;
    } catch(error) {
      console.error(error);
    } finally {
      toggleLoadingState(false);
    }
  };

  const fetchAnimeEpisodes = async (queryParams: AnimeEpisodesParams) => {
    toggleLoadingState(true);
    try {
      const { data } = await AnimeApi.fetchAnimeEpisodes(queryParams);
      if (data) return data;
    } catch(error) {
      console.error(error);
    } finally {
      toggleLoadingState(false);
    }
  }

  return {
    topAnimes,
    seasonUpcomingAnimes,
    animeGenres,
    fetchTopAnimes,
    fetchSeasonUpcomingAnimes,
    // fetchAnimeGenres,
    fetchAnimeByNameAndGenre,
    fetchAnimeEpisodes,
  };
});