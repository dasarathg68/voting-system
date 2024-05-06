import { createRouter, createWebHistory } from 'vue-router'
import BallotsView from '@/views/BallotsView.vue'
import LoginView from '@/views/LoginView.vue'

import { useAuthStore } from '@/stores/auth'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/ballots',
      name: 'ballots',
      component: BallotsView
    },
    { path: '/login', name: 'login', component: LoginView }
  ]
})
router.beforeEach(async (to) => {
  if (!useAuthStore().isAuthenticated && to.name !== 'login') {
    return { name: 'login' }
  }
})
export default router
