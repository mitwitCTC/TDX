import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'
import StationsView from '../views/StationsView.vue'
import CarparksView from '../views/CarparksView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WelcomeView,
    },
    {
      path: '/stations',
      name: 'stations',
      component: StationsView
    },
    {
      path: '/carParks',
      name: 'carParks',
      component: () => import('../views/CarparksView.vue')
    }
  ]
})

export default router
