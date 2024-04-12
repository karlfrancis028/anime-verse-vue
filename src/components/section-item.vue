<script setup lang="ts">
  import { computed } from 'vue';

  interface SectionItemProps {
    image: string;
    title: string;
    type: string | null;
    genres?: any[];
    year: number | null;
  }

  const props = defineProps<SectionItemProps>();

  const computedGenres = computed(() => {
    if (!props.genres?.length) return null;

    return props.genres[0].name;
  });

  const infoDisplay = computed(() => {
    const infos = [props.type, computedGenres.value, props.year].filter(info => info !== null && info !== undefined);

    if (infos.length === 0) return '-';
    
    return infos.join(' ~ ');
  });
</script>

<template>
  <div class="section-item">
    <img :src="image" alt="Section Item Image" class="section-item__image" />
    <div class="section-item__description">
      <p class="section-item__info">{{ infoDisplay }}</p>
      <p class="section-item__title">{{ title }}</p>
    </div>
  </div>
</template>