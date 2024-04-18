<script setup lang="ts">
  interface OneColLayoutProps {
    isLoading: boolean;
    showNav?: boolean;
  }

  withDefaults(defineProps<OneColLayoutProps>(), {
    isLoading: false,
    showNav: true,
  });
</script>

<template>
  <blocking-loader v-if="isLoading" />
  <div v-else class="one-col-layout container"
              :class="{'has-nav': showNav}">
    <navbar v-if="showNav"/>
    <slot name="toolbar"></slot>
    <div class="one-col-layout__content">
      <slot></slot>
    </div>
  </div>
</template>