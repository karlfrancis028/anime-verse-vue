import type { 
  TopAnimeParams 
} from "@/interfaces/params";
import { AnimeApi } from "@/services/anime";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAnimeStore = defineStore('anime', () => {
  const topAnimes = ref<any[]>([]);

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

  return {
    topAnimes,
    fetchTopAnimes,
  };
});