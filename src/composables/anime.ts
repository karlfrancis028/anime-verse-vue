import { ROUTE_PARAMS } from "@/router";
import { useRouter } from "vue-router";

export function useAnimeComposable() {
  const $router = useRouter();

  const routeToEpisodes = (anime_id: number) => {
    $router.push({
      name: 'episodes',
      params: {
        [ROUTE_PARAMS.ANIME_ID]: anime_id,
      }
    })
  };

  return {
    routeToEpisodes,
  };
}
