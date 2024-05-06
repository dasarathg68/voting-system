import { createRouter, createWebHistory } from 'vue-router'
import BallotsView from '@/views/BallotsView.vue'
import LoginView from '@/views/LoginView.vue'

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

export default router
