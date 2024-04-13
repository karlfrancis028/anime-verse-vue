<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { ref } from 'vue';

  const $route = useRoute();
  const searchString = ref<string>('');
</script>

<template>
  <one-col-layout class="root-search-page">
    <template #toolbar>
      <div class="root-searh-page__toolbar">
        <search-input v-model="searchString" />
      </div>
    </template>
    tet
  </one-col-layout>
</template>