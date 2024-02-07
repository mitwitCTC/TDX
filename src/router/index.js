import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'
import StationsView from '../views/StationsView.vue'
// import CarparksView from '../views/CarparksView.vue'

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
      path: '/carparks/:CarParkID?',
      name: 'carparks',
      component: () => import('../views/CarparksView.vue')
    },
    {
      path: '/CarParkList/:mode/:CarParkID?',
      name: 'CarParkList',
      component: () => import('../views/CarParks/CarParkList.vue'),
    },
    {
      path: '/ParkingSpaceList/:mode/:CarParkID',
      name: 'ParkingSpaceList',
      component: () => import('../views/CarParks/ParkingSpaceList.vue'),
    },
    {
      path: '/ParkingServiceTimeList/:mode/:CarParkID',
      name: 'ParkingServiceTimeList',
      component: () => import('../views/CarParks/ParkingServiceTimeList.vue'),
    },
  ]
})

export default router
