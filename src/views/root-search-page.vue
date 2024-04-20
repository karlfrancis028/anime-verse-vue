<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router';
  import { computed, onMounted, ref, watch } from 'vue';
  import { useAnimeStore } from '@/stores/anime';
  import { storeToRefs } from 'pinia';
  import { TopAnimeFilters } from '@/references';
  import { AnimeApi } from '@/services/anime';
  import { useLoadingStore } from '@/stores/loading';

  const loadingStore = useLoadingStore();
  const { loading } = storeToRefs(loadingStore);
  const animeStore = useAnimeStore();
  const { animeGenres } = storeToRefs(animeStore);
  const $route = useRoute();
  const $router = useRouter();
  const searchString = ref<string>('');
  const selectedGenre = ref<{[key:string]: any}>();
  const animeList = ref<any[]>([]);
  const paginationData = ref<any>({});
  const pageNumber = ref<number>();

  const computedPageTitle = computed(() => {
    if (typeof $route.query.type !== 'string' || !$route.query.type) return '';
    
    const pageTitles: {[key: string]: any} = {
      upcoming: 'Upcoming Animes',
      popular: 'Popular Animes',
    };

    return pageTitles[$route.query.type];
  });

  const fetchDataFunction = async () => {
    if (searchString.value.trim().length > 0 || selectedGenre.value) {
      let qParams: {[key: string]: any} = {};

      if (searchString.value.trim().length > 0) {
        qParams = {
          ...qParams,
          q: searchString.value,
        }
      }

      if (selectedGenre.value) {
        qParams = {
          ...qParams,
          genre: selectedGenre.value.mal_id,
        };
      }

      return await AnimeApi.fetchAnimeByNameAndGenre(qParams);
    } else {
      if ($route.query.type === 'upcoming') {
        return await AnimeApi.fetchSeasonUpcomingAnimes({
          unapproved: false,
          sfw: true,
          page: pageNumber.value,
        });
      } else {
        return await AnimeApi.fetchTopAnimes({
          filter: TopAnimeFilters.AIRING,
          sfw: true,
          page: pageNumber.value,
        });
      }
    }
  }

  const fetchAnimeList = async () => {
    loadingStore.toggleLoadingState(true);
    try {
      const { data } = await fetchDataFunction();
      if (data) {
        animeList.value = data.data;
        paginationData.value = data.pagination;
      }
    } catch (error) {
      console.error(error);
    } finally {
      loadingStore.toggleLoadingState(false);
    }
  };

  const updatePageQuery = () => {
    $router.push({
      query: {
        ...$route.query,
        page: pageNumber.value,
      },
    });
  }
  
  watch(() => $route.query.type, async () => {
    await fetchAnimeList();
    pageNumber.value = 1;
    updatePageQuery();
  });

  watch(() => pageNumber.value, async () => {
    await fetchAnimeList();
    updatePageQuery();
  });

  watch(() => searchString.value, async () => {
    await fetchAnimeList();
  });

  onMounted(async () => {
    await animeStore.fetchAnimeGenres();
    await fetchAnimeList();
    pageNumber.value = Number($route.query.page);
  });
</script>

<template>
  <one-col-layout :is-loading="loading" 
                  class="root-search-page">
    <template #toolbar>
      <div class="root-search-page__toolbar">
        <h3 class="root-search-page__title">{{ computedPageTitle }}</h3>
        <div class="root-search-page__actions">
          <search-input v-model="searchString" />
          <!-- Commented out because no way to filter all animes using genre -->
          <!-- <my-select v-model="selectedGenre" 
                     placeholder="All"
                     displayed-label="name"
                     :options="animeGenres"/> -->
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
    <pagination v-model="pageNumber"
                :max-page="paginationData.last_visible_page"/>
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