<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { computed, onMounted, ref, watch } from 'vue';
  import { useAnimeStore } from '@/stores/anime';
  import { storeToRefs } from 'pinia';
  import { TopAnimeFilters } from '@/references';
import { AnimeApi } from '@/services/anime';

  const animeStore = useAnimeStore();
  const { animeGenres } = storeToRefs(animeStore);
  const $route = useRoute();
  const searchString = ref<string>('');
  const selectedGenre = ref<string>('');
  const animeList = ref<any[]>([]);
  const pageNumber = ref<number>(1);

  const computedPageTitle = computed(() => {
    if (typeof $route.query.type !== 'string' || !$route.query.type) return '';
    
    const pageTitles: {[key: string]: any} = {
      upcoming: 'Upcoming Animes',
      popular: 'Popular Animes',
    };

    return pageTitles[$route.query.type];
  });

  const fetchDataFunction = () => {
    if ($route.query.type === 'upcoming') {
      return AnimeApi.fetchSeasonUpcomingAnimes({
        unapproved: false,
        sfw: true,
        page: pageNumber.value,
      });
    } else {
      return AnimeApi.fetchTopAnimes({
        filter: TopAnimeFilters.AIRING,
        sfw: true,
        page: pageNumber.value,
      });
    }
  }

  const fetchAnimeList = async () => {
    try {
      const { data } = await fetchDataFunction();
      if (data) {
        animeList.value = data.data;
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  watch(() => $route.query.type, () => fetchAnimeList());

  onMounted(() => {
    animeStore.fetchAnimeGenres();
    fetchAnimeList();
  });
</script>

<template>
  <one-col-layout class="root-search-page">
    <template #toolbar>
      <div class="root-search-page__toolbar">
        <h3 class="root-search-page__title">{{ computedPageTitle }}</h3>
        <div class="root-search-page__actions">
          <search-input v-model="searchString" />
          <my-select v-model="selectedGenre" 
                     placeholder="All"
                     displayed-label="name"
                     :options="animeGenres"/>
        </div>
      </div>
    </template>
    <section-list>
      <section-item v-for="(item, index) in animeList" :key="index"
                    :image="item.images.jpg.image_url" 
                    :title="item.title"
                    :type="item.type"
                    :genres="item.genres"
                    :year="item.year"/>
    </section-list>
  </one-col-layout>
</template>

<style lang="scss">
  @import '@/assets/styles/main.scss';

  .root-search-page {

    &__toolbar {
      @extend %flex-col;
      gap: space(xs);
    }

    &__title {
      color: var(--title-color);
      margin-left: space(xs);
    }

    &__actions {
      @extend %flex-row;
      gap: space(base);

      .search-input {
        flex-grow: 1;
      }
    }
    
  }
</style>