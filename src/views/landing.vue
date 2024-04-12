<script setup lang="ts">
  import { useAnimeStore } from '@/stores/anime';
  import { onMounted } from 'vue';
  import { TopAnimeFilters } from '@/references';
  import { storeToRefs } from 'pinia';
  import { PhPlay } from '@phosphor-icons/vue';
  import { Carousel, Slide } from 'vue3-carousel';

  const animeStore = useAnimeStore();
  const { 
    topAnimes,
    seasonUpcomingAnimes,
  } = storeToRefs(animeStore);

  const fetchTopTenAnimes = () => {
    animeStore.fetchTopAnimes({
      filter: TopAnimeFilters.AIRING,
      sfw: true,
      limit: 10,
    });
  };

  const fetchSeasonUpcomingAnimes = () => {
    animeStore.fetchSeasonUpcomingAnimes({
      unapproved: false,
      sfw: true,
      limit: 10,
    });
  };

  onMounted(() => {
    fetchTopTenAnimes();
    fetchSeasonUpcomingAnimes();
  });
</script>

<template>
  <p v-if="topAnimes.length <= 0">Loading...</p>
  <one-col-layout v-else class="landing">
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