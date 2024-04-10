<script setup lang="ts">
  import { useAnimeStore } from '@/stores/anime';
  import { onMounted } from 'vue';
  import { TopAnimeFilters } from '@/references';
  import { storeToRefs } from 'pinia';
  import { PhPlay } from '@phosphor-icons/vue';

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
    <hero :image="topAnimes[0].images.jpg.image_url"
          :title="topAnimes[0].title"
          :description="topAnimes[0].synopsis"
          :type="topAnimes[0].type"
          :genres="topAnimes[0].genres"
          :year="topAnimes[0].year">
      <template v-slot:actions>
        <my-btn btn-text="Stream Now"
                btn-position="left" 
                :btn-icon="PhPlay" />
      </template>
    </hero>
  </one-col-layout>
</template>