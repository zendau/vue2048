import { createRouter, createWebHistory } from 'vue-router'
import topList from "../views/TopList";
import startGame from "../views/startGame.vue"
import game from "../views/game.vue"

const routes = [
  {
    path: '/',
    name: 'startGame',
    component: startGame
  },
  {
    path: '/game',
    name: 'game',
    component: game
  },
  {
    path: '/top',
    name: 'TopList',
    component: topList
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
})

export default router
