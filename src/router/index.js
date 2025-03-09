import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Home from '@/views/Home.vue'
import Profile from '@/views/Profile.vue'

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/home', name: 'Home', component: Home },
  { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


// Antes de cada navegación, verificamos si se requiere autenticación
// Before each navigation, check if the route requires authentication
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token')
    if (!token) {
      // Si no hay token, redirige a Login
      return next({ name: 'Login' })
    }
  }
  next()
})




export default router
