import { useLoadingStore } from '@/stores/loading.store'
import HomePage from '@/views/app/HomePage.vue'
import NotFound from '@/views/app/NotFound.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/',
    component: () => import('@/components/layout/DefaultLayout.vue'),
    children: [
      {
        path: 'home',
        component: HomePage,
        name: 'HomePage',
      },

    ],
  },
  {
    path: '/',
    component: () => import('@/components/layout/BlankLayout.vue'),
    children: [
      {
        path: 'login',
        component: LoginView,
        name: 'Login',
      },
      {
        path: 'register',
        component: RegisterView,
        name: 'Register',
      }
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
    name: 'NotFound',
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(() => {
  useLoadingStore().showLoader()
})

router.afterEach(() => {
  setTimeout(() => useLoadingStore().hideLoader(), 1000)
})

export default router