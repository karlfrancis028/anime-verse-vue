<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import { useLoadingStore } from '@/stores/loading';
  import { storeToRefs } from 'pinia';

  const loadingStore = useLoadingStore();
  const { loading } = storeToRefs(loadingStore);
</script>

<template>
  <navbar />
  <blocking-loader v-if="loading"/>
  <RouterView v-else/>
</template>
