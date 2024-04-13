<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { computed, onMounted, ref } from 'vue';
  import { useAnimeStore } from '@/stores/anime';
  import { storeToRefs } from 'pinia';

  const animeStore = useAnimeStore();
  const { animeGenres } = storeToRefs(animeStore);
  const $route = useRoute();
  const searchString = ref<string>('');
  const selectedGenre = ref<string>('');

  const computedPageTitle = computed(() => {
  if (typeof $route.query.type !== 'string' || !$route.query.type) return '';
    
    const pageTitles: {[key: string]: any} = {
      upcoming: 'Upcoming Animes',
      popular: 'Popular Animes',
      random: 'Random Animes', 
    };

    return pageTitles[$route.query.type];
  });

  onMounted(() => animeStore.fetchAnimeGenres());
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
    tet
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