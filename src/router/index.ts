import { createRouter, createWebHistory } from 'vue-router'
import Home from '../../src/pages/Home/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/anime/:id',
    name: 'AnimeDetailModal',
    component: Home,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
