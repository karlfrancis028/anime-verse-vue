<script setup lang="ts">
  import { ROUTE_PARAMS } from '@/router';
  import { AnimeApi } from '@/services/anime';
  import { useAnimeStore } from '@/stores/anime';
  import { useLoadingStore } from '@/stores/loading';
  import { storeToRefs } from 'pinia';
  import { onMounted, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';

  const loadingStore = useLoadingStore();
  const { loading } = storeToRefs(loadingStore);
  const animeStore = useAnimeStore();
  const animeEpisodes = ref<any[]>([]);
  const $route = useRoute();
  const page = ref<number>(1);
  const selectedAnimeEpisode = ref<{ [key:string]: any } | null>(null);
  const animeProfile = ref<{ [key:string]: any }>();

  const fetchAnimeEpisodes = async (anime_id: number) => {
    try {
      const data = await animeStore.fetchAnimeEpisodes({
        id: anime_id,
        page: page.value,
      });
  
      if (data) {
        animeEpisodes.value = data.data
      }
    } catch(error) {
      console.error(error);
    }
  };

  const fetchAnimeData = async (anime_id: number) => {
    loadingStore.toggleLoadingState(true);
    try {
      const { data } = await AnimeApi.fetchAnimeFullData(anime_id);
  
      if (data) {
        animeProfile.value = data.data
      }
    } catch(error) {
      console.error(error);
    } finally {
      loadingStore.toggleLoadingState(false);
    }
  };

  const routeToEpisode = async (option: { [key: string]: any }) => {
    const animeId = Number($route.params[ROUTE_PARAMS.ANIME_ID]);

    if(!animeId) return;

    loadingStore.toggleLoadingState(true);
    try {
      const { data } = await AnimeApi.fetchAnimeEpisodeById({
        id: animeId,
        episodeId: option.mal_id,
      });

      if (data) {
        selectedAnimeEpisode.value = data.data;
      }
    } catch(error) {
      console.error(error);
    } finally {
      loadingStore.toggleLoadingState(false);
    }
  };

  watch(() => selectedAnimeEpisode.value, (newVal: any) => {
    $route.query[ROUTE_PARAMS.ANIME_EPISODE_ID] = newVal.mal_id;
  });

  onMounted(async () => {
    await fetchAnimeEpisodes(Number($route.params[ROUTE_PARAMS.ANIME_ID]));
    await fetchAnimeData(Number($route.params[ROUTE_PARAMS.ANIME_ID]));
    if (!selectedAnimeEpisode.value) {
      selectedAnimeEpisode.value = animeEpisodes.value[0];
    }
  });
</script>

<template>
  <one-col-layout :is-loading="loading"
                  :show-back-btn="false"
                  class="episodes">
    <div v-if="selectedAnimeEpisode" 
         class="episodes__video-container">
      <vue-plyr>
        <video
          controls
          playsinline
          data-poster="poster.jpg"
        >
          <source
            size="720"
            :src="selectedAnimeEpisode.url"
            type="video/mp4"
          />
        </video>
      </vue-plyr>
    </div>
    <div class="episodes__anime-info">
      <anime-profile-section v-if="animeProfile"
                             :info="animeProfile" />
      <anime-episode-list v-if="animeEpisodes && selectedAnimeEpisode"
                          :options="animeEpisodes"
                          :active-episode-id="selectedAnimeEpisode.mal_id"
                          @click="routeToEpisode"/>
    </div>
  </one-col-layout>
</template>

<style lang="scss">
  @import '@/assets/styles/main.scss';

  .episodes {
    color: var(--title-color);

    &__anime-info {
      @extend %flex-row;
      gap: space(m);
      height: 330px;

      @media only screen and (max-width: 1024px) {
        flex-direction: column;
        height: unset;
      }

      .anime-profile-section {
        flex-basis: 70%;
      }

      .anime-episode-list {
        height: inherit;
        flex: 1;
      }
    }
  }
</style>
