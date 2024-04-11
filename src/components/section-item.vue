<script setup lang="ts">
import { computed } from 'vue';

  interface SectionItemProps {
    image: string;
    title: string;
    type: string;
    genre: string;
    year: number | null;
  }

  const props = defineProps<SectionItemProps>();

  const infoDisplay = computed(() => {
  const infos = [props.type, props.genre, props.year].filter(info => info !== null && info !== undefined);
    
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