<script setup lang="ts">
  import { computed } from 'vue';

  interface HeroProps {
    image: string;
    title: string;
    description: string;
    type: string;
    genres: Record<string, any>[];
    year: number;
  }

  const props = defineProps<HeroProps>();

  const computedGenreDisplay = computed(() => {
    const genreNames = props.genres.map(genre => genre.name);

    return `Genres: ${genreNames.join(', ')}`;
  });

  const computedTypeAndYearDisplay = computed(() => {
    return `${props.type} (${props.year})`;
  })
</script>

<template>
  <div class="hero">
    <img :src="image" alt="Hero image" class="hero__img">
    <div class="hero__info">
      <div class="hero__info--title">
        <h1 class="heading">{{ title }}</h1>
        <p class="subheading">{{ computedTypeAndYearDisplay }}</p>
      </div>
      <p class="hero__info--description">{{ description }}</p>
      <p class="hero__info--summary">{{ computedGenreDisplay }}</p>
      <div class="hero__actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>