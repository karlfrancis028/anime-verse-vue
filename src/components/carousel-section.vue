<script setup lang="ts">
  import { ref } from 'vue';
  import { Carousel, Slide } from 'vue3-carousel';
  import { PhCaretCircleLeft, PhCaretCircleRight } from '@phosphor-icons/vue';

  interface CarouselSectionProps {
    title: string;
    options: any[];
  }

  const carouselRef = ref<any>(null);

  const props = defineProps<CarouselSectionProps>();

  const handlePrev = () => carouselRef.value?.data.prev();

  const handleNext = () => carouselRef.value?.data.next();

  const breakpoints = {
    300: {
      itemsToShow: 2,
      snapAlign: 'start',
    },
    620: {
      itemsToShow: 3,
      snapAlign: 'start',
    },
    780: {
      itemsToShow: 4,
      snapAlign: 'start',
    },
    980: {
      itemsToShow: 5,
      snapAlign: 'start',
    }
  }
</script>

<template>
  <div class="carousel-section">
    <div class="carousel-section__header">
      <h2 class="carousel-section__title">{{ title }}</h2>
      <div class="carousel-section__actions">
        <ph-caret-circle-left :size="30" weight="fill" @click="handlePrev"/>
        <ph-caret-circle-right :size="30" weight="fill" @click="handleNext"/>
      </div>
    </div>
    <Carousel ref="carouselRef" :breakpoints="breakpoints">
      <Slide v-for="(option, index) in options" :key="index">
        <slot name="option" v-bind="{option}"></slot>
      </Slide>
    </Carousel>
  </div>
</template>