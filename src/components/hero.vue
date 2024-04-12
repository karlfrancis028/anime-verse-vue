<script setup lang="ts">
  interface HeroProps {
    image: string;
    title: string;
    description: string;
  }

  const props = defineProps<HeroProps>();
</script>

<template>
  <div class="hero"
       :style="{ backgroundImage: `url(${image})` }">
    <div class="hero__info">
      <h1 class="hero__title">{{ title }}</h1>
      <p class="hero__description">{{ description }}</p>
    </div>
  </div>
</template>