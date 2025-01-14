import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import UserView from '@/views/UserView.vue';
import AuthView from '@/views/AuthView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/user',
      component: UserView,
      children: [
        {
          path: '',
          component: () => import('@/views/HomeView.vue')
        },
        {
          path: 'group/:id',
          component: () => import('@/views/TaskView.vue')
        }
      ]
    },
    {
      path: '/auth',
      component: AuthView
    }
  ],
});

export default router;
