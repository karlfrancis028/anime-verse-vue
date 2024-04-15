import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingStore = defineStore('loading', () => {
  const loading = ref<boolean>(false);

  const toggleLoadingState = (isLoading: boolean) => {
    loading.value = isLoading !== undefined
      ? isLoading
      : !loading.value;
  };

  return {
    loading,
    toggleLoadingState,
  };
});
