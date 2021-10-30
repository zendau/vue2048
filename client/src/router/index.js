import { createRouter, createWebHistory } from 'vue-router'
import Board from '../views/Board.vue'
import TopList from "../views/TopList";

const routes = [
  {
    path: '/',
    name: 'Board',
    component: Board
  },
  {
    path: '/top',
    name: 'TopList',
    component: TopList
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
