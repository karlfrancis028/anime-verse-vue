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
  } = storeToRefs(animeStore);

  const fetchTopTenAnimes = () => {
    animeStore.fetchTopAnimes({
      filter: TopAnimeFilters.AIRING,
      limit: 10,
    });
  };

  onMounted(() => fetchTopTenAnimes());
</script>

<template>
  <p v-if="topAnimes.length <= 0">Loading...</p>
  <one-col-layout v-else class="landing">
    <Carousel :autoplay="5000"
              pause-autoplay-on-hover>
      <Slide v-for="(anime, index) in topAnimes" :key="index">      
        <hero :image="anime.images.jpg.large_image_url"
              :title="anime.title"
              :description="anime.synopsis"
              :type="anime.type"
              :genres="anime.genres"
              :year="anime.year">
          <template v-slot:actions>
            <my-btn btn-text="Stream Now"
                    btn-position="left" 
                    :btn-icon="PhPlay" />
          </template>
        </hero>
      </Slide>
    </Carousel>
  </one-col-layout>
</template>