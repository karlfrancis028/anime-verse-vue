<script setup lang="ts">
  import { computed, onMounted } from 'vue';

  const props = defineProps<{
    options: any[];
    activeEpisodeId: number;
  }>();
  
  const emit = defineEmits(['click']);

  const calculateEpisodeHeight = computed(() => {
    const firstEpisode = document.querySelector('.anime-episode-list__episode');

    if (!firstEpisode) return 50;

    return firstEpisode.getBoundingClientRect().height;
  });

  const scrollToActiveEpisode = () => {
    const episodeHeight = calculateEpisodeHeight.value;
    const activeIndex = props.options.findIndex(option => option.mal_id === props.activeEpisodeId);
    const scrollTo = activeIndex * episodeHeight;

    const container = document.querySelector('.anime-episode-list__episodes');

    if (container) {
      container.scrollTo({
        top: scrollTo,
        behavior: 'auto',
      });
    }
  }

  const displayedEpisodeText = (option: { [key: string]: any }) => {
    if (!(option.title && option.episode)) return '';

    const displayedText = `${option.episode}: ${option.title}`;

    return displayedText;
  };

  const isEpisodeActive = (option: { [key: string]: any }) => {
    if (!option.mal_id) return '';

    return option.mal_id === props.activeEpisodeId
      ? 'active'
      : '';
  };

  const handleClick = (option: { [key: string]: any }) => {
    emit('click', option);
  };

  onMounted(() => scrollToActiveEpisode());
</script>

<template>
  <div class="anime-episode-list">
    <h3 class="anime-episode-list__header">Episodes</h3>
    <div class="anime-episode-list__episodes">
      <div v-for="(option, index) in options" :key="index" 
           class="anime-episode-list__episode"
           :class="isEpisodeActive(option)"
           @click="handleClick(option)">
        <p>{{ displayedEpisodeText(option) }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import '@/assets/styles/main.scss';

  .anime-episode-list {
    color: var(--title-color);

    &__header {
      background-color: var(--body-color-dark);
      text-align: center;
      margin-bottom: 6px;
      padding: space(s) 0;

      @media only screen and (max-width: 1024px) {
        text-align: left;
        padding-left: space(base);
      }
    }

    &__episodes {
      overflow-y: auto;
      max-height: 265px;

      &::-webkit-scrollbar {
        width: 12px;
      }

      &::-webkit-scrollbar-track {
        background-color: var(--body-color-darker);
      }

      &::-webkit-scrollbar-thumb {
        background-color: var(--card-color);
        cursor: pointer;
      }
    }

    &__episode {
      cursor: pointer;

      &.active {
        pointer-events: none;
      }

      &.active,
      &:hover {
        background-color: var(--body-color-invert) !important;
        color: var(--title-color-invert);
      }

      p {
        margin-left: space(base);
        font-size: font(smaller-font-size);
        padding: space(s) 0;
      }

      &:nth-child(odd) {
        background-color: var(--body-color-darker);
      }

      &:nth-child(even) {
        background-color: var(--body-color-dark);
      }
    }
  }
</style>
