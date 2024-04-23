import { createRouter, createWebHistory } from 'vue-router';
import Landing from '@/views/landing.vue';
import RootSearchPage from '@/views/root-search-page.vue';
import AnimeEpisodes from '@/views/episodes.vue';
import Error from '@/views/error.vue';

export const ROUTE_PARAMS = {
  ANIME_ID: 'anime_id',
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Landing,
    },
    {
      path: '/view-all',
      name: 'viewAll',
      component: RootSearchPage,
    },
    {
      path: `/:${ROUTE_PARAMS.ANIME_ID}`,
      name: 'episodes',
      component: AnimeEpisodes,
    },
    {
      path: '/error',
      name: 'error',
      component: Error,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { 
        name: 'error',
      },
    },
  ]
})

export default router
