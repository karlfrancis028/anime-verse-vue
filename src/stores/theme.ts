import { defineStore } from "pinia";
import { computed, onMounted, ref, watch } from "vue";

export const useTheme = defineStore('theme', () => {
  const isDarkTheme = ref<boolean>(true);

  const isThemeDarkMode = computed(() => isDarkTheme.value === true);

  const toggleTheme = () => isDarkTheme.value = !isDarkTheme.value;

  const fetchTheme = () => {
    if (isThemeDarkMode.value) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  };

  watch(isThemeDarkMode, fetchTheme);

  onMounted(() => fetchTheme());

  return {
    isThemeDarkMode,
    toggleTheme,
    fetchTheme,
  };
});