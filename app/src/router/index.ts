import { createRouter, createWebHistory } from 'vue-router'
import BallotsView from '@/views/BallotsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/ballots',
      name: 'ballots',
      component: BallotsView
    }
  ]
})

export default router
