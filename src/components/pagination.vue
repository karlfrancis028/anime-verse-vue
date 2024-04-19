<script setup lang="ts">
  defineProps<{
    modelValue: number | undefined;
    maxPage: number | undefined;
  }>();

  const emit = defineEmits(['update:model-value']);

  const choosePageNumber = (pageNumber: number) => {
    emit('update:model-value', pageNumber);
  }
</script>

<template>
  <div class="pagination">
    <div v-for="page in maxPage" :key="page" 
         class="pagination__number"
         :class="{ 'active': page === modelValue }"
         @click="choosePageNumber(page)">
      {{ page }}
    </div>
  </div>
</template>
