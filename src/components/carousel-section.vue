<script setup lang="ts">
  import { Carousel, Slide } from 'vue3-carousel';
  interface CarouselSectionProps {
    title: string;
    options: any[];
  }

  const props = defineProps<CarouselSectionProps>();
</script>

<template>
  <div class="carousel-section">
    <h2 class="carousel-section__title">{{ title }}</h2>
    <Carousel :items-to-show="5">
      <Slide v-for="(option, index) in options" :key="index">
        <slot name="option" v-bind="{option}"></slot>
      </Slide>
    </Carousel>
  </div>
</template>