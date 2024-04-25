import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },  
  {
    path: '/grid-table',
    name: 'grid table',
    component: () => import('../pages/GridTable.vue')
  },
  {
    path: '/drag-and-drop',
    name: 'drag and drop',
    component: () => import('../pages/DragAndDrop.vue')
  }
  ,
  {
    path: '/mutable-tables',
    name: 'mutable tables',
    component: () => import('../pages/MutableTables.vue')
  },

  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
