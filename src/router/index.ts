import { createRouter, createWebHistory } from 'vue-router'
import Home from '../../src/pages/Home/index.vue'
import AnimeDetail from '../pages/AnimeDetail/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/anime/:id',
    name: 'AnimeDetail',
    component: AnimeDetail,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
