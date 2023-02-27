import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/auth.vue'),
    },
    {
      path: '/sheet',
      name: 'sheet',
      component: () => import('../views/sheet.vue'),
    },
  ],
});

export default router;
