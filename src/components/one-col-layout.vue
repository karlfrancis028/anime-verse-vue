<script setup lang="ts">
  import { PhCaretLeft } from '@phosphor-icons/vue';

  interface OneColLayoutProps {
    isLoading: boolean;
    showNav?: boolean;
    showBackBtn?: boolean;
    backBtnText?: string;
  }

  withDefaults(defineProps<OneColLayoutProps>(), {
    isLoading: false,
    showNav: true,
    showBackBtn: true,
    backBtnText: 'Back'
  });

  const emit = defineEmits(['back-btn-action']);

  const backBtnAction = () => emit('back-btn-action');
</script>

<template>
  <blocking-loader v-if="isLoading" />
  <div v-else class="one-col-layout container"
              :class="{'has-nav': showNav}">
    <navbar v-if="showNav"/>
    <div v-if="showBackBtn" 
         class="one-col-layout__back-btn"
         @click="backBtnAction">
      <ph-caret-left :size="16" weight="bold" />
      <p>{{ backBtnText }}</p>
    </div>
    <slot name="toolbar"></slot>
    <div class="one-col-layout__content">
      <slot></slot>
    </div>
  </div>
</template>