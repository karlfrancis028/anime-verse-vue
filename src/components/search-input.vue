<script setup lang="ts">
  import { PhMagnifyingGlass } from '@phosphor-icons/vue';
  import { vMaska } from 'maska';
  import { computed, reactive, ref, useAttrs } from 'vue';

  interface SearchInputProps {
    type?: string;
    modelValue?: string;
    placeholder?: string;
  }

  
  const props = withDefaults(defineProps<SearchInputProps>(), {
    type: 'text',
    modelValue: '',
    placeholder: 'Search for an anime title...'
  });
  const stringVal = ref<string>(props.modelValue || '');
  const attrs = useAttrs();
  const emit = defineEmits(['update:model-value']);
  const maskOptions = reactive({ 
    mask: '',
  });
  defineOptions({ inheritAttrs: false });

  const listeners = computed(() => {
    return {
      ...attrs,
      maska: (event: any) => handleInput(event),
      keydown: (event: any) => handleKeydown(event),
    };
  });

  const handleInput = (ev: InputEvent) => {
    if (!ev.target) return;

    const target = ev.target as HTMLInputElement;

    stringVal.value = target.value;
  };

  const handleKeydown = (ev: KeyboardEvent) => {
    if (props.type === 'number') {
      if (['+', 'e'].includes(ev.key)) {
        ev.preventDefault();
      }
    }
  };

  const submit = () => emit('update:model-value', stringVal.value);

</script>

<template>
  <div class="search-input">
    <input type="text"
           v-on="listeners"
           v-bind="attrs"
           v-maska:[maskOptions] 
           :value="modelValue"
           :placeholder="placeholder"
           @keyup.enter="submit"/>
    <ph-magnifying-glass :size="24" weight="bold" @click="submit" />
  </div>
</template>