<script setup lang="ts">

  interface MySelectProps {
    placeholder: string;
    modelValue: {[key: string]: any} | undefined | null;
    options: any[];
    displayedLabel: string;
  } 

  const props = defineProps<MySelectProps>();
  const emit = defineEmits(['update:model-value']);

  const onChange = (event: Event) => {
    const index = (event.target as HTMLSelectElement).selectedIndex;
    const selectedOption = index > 0 ? props.options[index - 1] : null;

    emit('update:model-value', selectedOption);
  };
</script>

<template>
  <select class="my-select" 
          :value="modelValue && modelValue.name"
          @change="onChange($event)">
    <option value="" class="my-select__option">{{ placeholder }}</option>
    <option v-for="(option, index) in options" :key="index" class="my-select__option">{{ option[displayedLabel] }}</option>
  </select>
</template>