import HomePage from '@/views/app/HomePage.vue'
import NotFound from '@/views/app/NotFound.vue'
import LoginView from '@/views/auth/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path : '/',
    component : () => import('@/components/layout/DefaultLayout.vue'),
    children : [
      {
        path: '',
        component: HomePage,
        name : 'HomePage',
      },
    ],
  },
  {
    path : '/',
    component : () => import('@/components/layout/BlankLayout.vue'),
    children : [
      {
        path: '/login',
        component: LoginView,
        name : 'Login',
      },
    ],
  },
  {
    path : '/:pathMatch(.*)*',
    component : NotFound,
    name : 'NotFound',
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router