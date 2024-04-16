<script setup lang="ts">
  import { PhMoon, PhSun, PhSquaresFour } from '@phosphor-icons/vue';
  import { computed, ref } from 'vue';
  import { useTheme } from '@/stores/theme';
  import { storeToRefs } from 'pinia';
  import { useRoute, useRouter } from 'vue-router';

  const themeStore = useTheme();
  const $router = useRouter();
  const $route = useRoute();
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

  const routeToPage = (route: Record<string, any>) => {
    const routeOptions: {[key: string]: any} = {
      path: route.path,
    };

    if (route.query) {
      routeOptions.query = {
        type: route.query.type,
      };
    }

    $router.push(routeOptions);
    showSideNav.value = false;
  };

  const isRouteActive = (route: Record<string, any>) => {
    if ($route.fullPath.includes('type=')) return areObjectsEqual($route.query, route.query);

    return $route.path === route.path;
  };

  const areObjectsEqual = (obj1: any, obj2: any) => {
    if (!obj1 || !obj2) return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }

    return true;
  }

  const navRoutes = [
    {
      label: 'Home',
      path: '/',
    },
    {
      label: 'Upcoming',
      path: '/view-all',
      query: {
        type: 'upcoming',
      },
    },
    {
      label: 'Popular',
      path: '/view-all',
      query: {
        type: 'popular',
      },
    },
  ];
</script>

<template>
  <nav class="nav">
    <h2 class="nav__logo">AnimeVerse</h2>
    <div class="nav__menu">
      <div class="nav__list" 
           :class="isHidden">
        <div v-for="(route, index) in navRoutes" :key="index"
             class="nav__item"
             :class="{ 'active' : isRouteActive(route) }"
             @click="routeToPage(route)">
          <p>{{ route.label }}</p>
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