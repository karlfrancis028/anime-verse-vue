<script setup lang="ts">
  import { useAnimeStore } from '@/stores/anime';
  import { onMounted } from 'vue';
  import { TopAnimeFilters } from '@/references';
  import { storeToRefs } from 'pinia';
  import HeroImage from '@/assets/hero-image.jpg';
  import { useLoadingStore } from '@/stores/loading';

  const loadingStore = useLoadingStore();
  const { loading } = storeToRefs(loadingStore);
  const animeStore = useAnimeStore();
  const { 
    topAnimes,
    seasonUpcomingAnimes,
  } = storeToRefs(animeStore);

  const fetchTopTenAnimes = async () => {
    await animeStore.fetchTopAnimes({
      filter: TopAnimeFilters.AIRING,
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
                        :title="option.title"
                        :type="option.type"
                        :genres="option.genres"
                        :year="option.year"/>
        </template>
      </carousel-section>
      <carousel-section title="Most Popular"
                        :options="topAnimes">
        <template v-slot:option="{option}">
          <section-item :image="option.images.jpg.image_url" 
                        :title="option.title"
                        :type="option.type"
                        :genres="option.genres"
                        :year="option.year"/>
        </template>
      </carousel-section>
    </div>
  </one-col-layout>
</template>