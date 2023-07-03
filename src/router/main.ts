import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/users',
    name: 'users',
    component: () => import('../modules/users/ListUsers.vue')
  },
  {
    path: '/users/:id',
    name: 'user-details',
    component: () => import('../modules/users/UserDetail.vue')
  },
  { path: '/:pathMatch(.*)*', redirect: { name: 'users' } }
]

const mainRouter = createRouter({
  history: createWebHistory(),
  routes
})

export default mainRouter
