<script setup lang="ts">
  

  interface MySelectProps {
    placeholder: string;
    modelValue: string;
    options: any[];
    displayedLabel: string;
  } 

  defineProps<MySelectProps>();
  const emit = defineEmits(['update:model-value']);

  const onChange = (event: Event) => {
    const { value } = event.target as HTMLSelectElement;

    emit('update:model-value', value);
  };
</script>

<template>
  <select class="my-select" 
          :value="modelValue"
          @change="onChange($event)">
    <option value="" class="my-select__option">{{ placeholder }}</option>
    <option v-for="(option, index) in options" :key="index" class="my-select__option">{{ option[displayedLabel] }}</option>
  </select>
</template>