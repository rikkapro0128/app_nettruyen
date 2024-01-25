import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import HomePage from '../views/HomePage.vue'
import BioPage from '../views/BioPage.vue'
import ChapterPage from '../views/ChapterPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/bio',
    name: 'Bio',
    component: BioPage
  },
  {
    path: '/chapter',
    name: 'Chapter',
    component: ChapterPage
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
