import { createRouter, createWebHistory } from 'vue-router';
import Landing from '@/views/landing.vue';
import RootSearchPage from '@/views/root-search-page.vue';

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
  ]
})

export default router
