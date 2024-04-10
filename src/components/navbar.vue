<script setup lang="ts">
  import { PhMoon, PhSun, PhSquaresFour } from '@phosphor-icons/vue';
  import { computed, ref } from 'vue';
  import { useTheme } from '@/stores/theme';
  import { storeToRefs } from 'pinia';

  const themeStore = useTheme();
  const {
    isThemeDarkMode,
  } = storeToRefs(themeStore);
  const showSideNav = ref<boolean>(false);

  const activeIcon = computed(() => {
    return isThemeDarkMode.value
      ? PhSun 
      : PhMoon;
  });

  const isHidden = computed(() => {
    return !showSideNav.value
      ? 'hidden'
      : '';
  });

  const toggleDarkMode = () => themeStore.toggleTheme();

  const toggleSideBar = () => {
    showSideNav.value = !showSideNav.value;
  };
</script>

<template>
  <nav class="nav container">
    <h2 class="nav__logo">AnimeVerse</h2>
    <div class="nav__menu">
      <div class="nav__list" 
           :class="isHidden">
        <div class="nav__item">
          <p>Home</p>
        </div>
        <div class="nav__item">
          <p>Updated</p>
        </div>
        <div class="nav__item">
          <p>Ongoing</p>
        </div>
        <div class="nav__item">
          <p>Upcoming</p>
        </div>
        <div class="nav__item">
          <p>Popular</p>
        </div>
        <div class="nav__item">
          <p>Random</p>
        </div>
        <div class="nav__item">
          <p>Genres</p>
        </div>
      </div>
    </div>
    <div class="nav__actions">
      <component :is="activeIcon" :size="24" @click="toggleDarkMode"/>
      <ph-squares-four :size="24" 
                       class="nav__toggle"
                       @click="toggleSideBar" />
    </div>
  </nav>
</template>