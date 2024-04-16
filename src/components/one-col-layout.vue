<script setup lang="ts">
  interface OneColLayoutProps {
    isLoading: boolean;
  }

  withDefaults(defineProps<OneColLayoutProps>(), {
    isLoading: false,
  });
</script>

<template>
  <blocking-loader v-if="isLoading" />
  <div v-else class="one-col-layout container">
    <navbar/>
    <slot name="toolbar"></slot>
    <div class="one-col-layout__content">
      <slot></slot>
    </div>
  </div>
</template>