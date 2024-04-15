<script setup lang="ts">
  interface BlockingLoaderProps {
    loadingMessage?: string;
  }

  withDefaults(defineProps<BlockingLoaderProps>(), {
    loadingMessage: 'Loading... Please wait...'
  });
</script>

<template>
  <div class="blocking-loader">
    <div class="blocking-loader__container">
      <img src="@/assets/loading-blocker-image.png" alt="Loading blocker image" class="blocking-loader__img" />
      <p class="blocking-loader__message">{{ loadingMessage }}</p>
    </div>
  </div>
</template>