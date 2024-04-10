<script setup lang="ts">
  import { computed } from 'vue';

  interface MyBtnProps {
    btnText: string;
    btnIcon?: any;
    iconPosition?: 'left' | 'right';
    btnType?: 'button' | 'submit';
  };

  const props = withDefaults(defineProps<MyBtnProps>(), {
    btnType: 'button',
  });

  const emit = defineEmits(['click']);

  const computedIconPosition = computed(() => {
    if (!props.iconPosition) return '';

    return props.iconPosition.toLocaleLowerCase() === 'right'
      ? 'right'
      : '';
  });

  const handleClick = () => {
    emit('click');
  };
</script>

<template>
  <button class="my-btn"
          :class="computedIconPosition"
          :type="btnType"
          @click="handleClick">
    <component :is="btnIcon" :size="16" weight="bold"/>
    <p>{{ btnText }}</p>
  </button>
</template>