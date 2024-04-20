<script setup lang="ts">
  import { computed } from 'vue';
  import { 
    PhCaretLeft, 
    PhCaretDoubleLeft, 
    PhCaretRight, 
    PhCaretDoubleRight 
  } from '@phosphor-icons/vue';

  const props = defineProps<{
    modelValue: number | undefined;
    maxPage: number | undefined;
  }>();

  const emit = defineEmits(['update:model-value']);

  const displayedPages = computed(() => {
    if (!props.modelValue || !props.maxPage) return [];

    const start = Math.max(1, props.modelValue - 2);
    const end = Math.min(props.maxPage || 0, start + 4);
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  });

  const choosePageNumber = (pageNumber: number | undefined) => {
    if (!pageNumber) return;
    
    emit('update:model-value', pageNumber);
  };
</script>

<template>
  <div class="pagination">
    <div v-if="modelValue && modelValue > 2" 
         class="pagination__container"
         @click="choosePageNumber(1)">
      <ph-caret-double-left :size="14" weight="bold" />
    </div>
    <div v-if="modelValue && modelValue > 1"
         class="pagination__container"
         @click="choosePageNumber(modelValue && modelValue - 1)">
      <ph-caret-left :size="14" weight="bold" />
    </div>
    <div v-for="page in displayedPages" :key="page" 
         class="pagination__container"
         :class="{ 'active': page === modelValue }"
         @click="choosePageNumber(page)">
      {{ page }}
    </div>
    <div v-if="maxPage && modelValue && maxPage - modelValue > 1" 
         class="pagination__container"
         @click="choosePageNumber(modelValue && modelValue + 1)">
      <ph-caret-right :size="14" weight="bold" />
    </div>
    <div v-if="maxPage && modelValue && maxPage - modelValue >= 2" 
         class="pagination__container"
         @click="choosePageNumber(maxPage)">
      <ph-caret-double-right :size="14" weight="bold" />
    </div>
  </div>
</template>
