<script setup lang="ts">
  import { useAnimeStore } from '@/stores/anime';
  import { onMounted } from 'vue';
  import { TopAnimeFilters } from '@/references';
  import { storeToRefs } from 'pinia';
  import HeroImage from '@/assets/hero-image.jpg';
  import { useLoadingStore } from '@/stores/loading';
  import { useRouter } from 'vue-router';
  import { ROUTE_PARAMS } from '@/router';

  const $router = useRouter();
  const loadingStore = useLoadingStore();
  const { loading } = storeToRefs(loadingStore);
  const animeStore = useAnimeStore();
  const { 
    topAnimes,
    seasonUpcomingAnimes,
  } = storeToRefs(animeStore);

  const fetchTopTenAnimes = async () => {
    await animeStore.fetchTopAnimes({
      filter: TopAnimeFilters.BYPOPULARITY,
      sfw: true,
      limit: 10,
    });
  };

  const fetchSeasonUpcomingAnimes = async () => {
    await animeStore.fetchSeasonUpcomingAnimes({
      unapproved: false,
      sfw: true,
      limit: 10,
    });
  };

  const routeToEpisodes = (anime_id: number) => {
    $router.push({
      name: 'episodes',
      params: {
        [ROUTE_PARAMS.ANIME_ID]: anime_id,
      }
    })
  };

  onMounted(async () => {
    await fetchTopTenAnimes();
    await fetchSeasonUpcomingAnimes();
  });

  const heroTitle = 'How will your journey begin? Step into the Animeverse!';

  const heroDescription = 'Embark on an exhilarating odyssey through the boundless realms of Animeverse, where imagination knows no limits and every adventure awaits. Immerse yourself in a universe brimming with captivating stories, vibrant characters, and awe-inspiring worlds. Unleash your inner hero as you explore the vast landscapes of anime excellence. Your epic saga starts here in Animeverse.';
</script>

<template>
  <one-col-layout :is-loading="loading"
                  :show-back-btn="false"
                  class="landing" >
    <hero :image="HeroImage"
          :title="heroTitle"
          :description="heroDescription" />
    <div class="landing__anime-sections">
      <carousel-section title="Upcoming Animes"
                        :options="seasonUpcomingAnimes">
        <template v-slot:option="{option}">
          <section-item :image="option.images.jpg.image_url" 
                        :title="option.title_english || option.title"
                        :type="option.type"
                        :genres="option.genres"
                        :year="option.year"
                        @click="routeToEpisodes(option.mal_id)"/>
        </template>
      </carousel-section>
      <carousel-section title="Most Popular"
                        :options="topAnimes">
        <template v-slot:option="{option}">
          <section-item :image="option.images.jpg.image_url" 
                        :title="option.title_english || option.title"
                        :type="option.type"
                        :genres="option.genres"
                        :year="option.year"
                        @click="routeToEpisodes(option.mal_id)"/>
        </template>
      </carousel-section>
    </div>
  </one-col-layout>
</template>