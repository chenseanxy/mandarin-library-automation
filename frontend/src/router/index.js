import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminLogin from '../components/AdminLogin.vue'
import AdminHome from '../components/AdminHome.vue'
import ReaderLogin from '../components/ReaderLogin.vue'
import ReaderHome from '../components/ReaderHome.vue'
import LibrarianHome from '../components/LibrarianHome.vue'
Vue.use(VueRouter)

const routes = [
  {path:'/', redirect: '/Login'},
  {path: '/Login', component: ReaderLogin},
  {path: '/ReaderHome', component: ReaderHome},
  {path: '/LibrarianHome', component: LibrarianHome},
  {path: '/AdminLogin', component: AdminLogin},
  {path: '/AdminHome', component: AdminHome}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/*
router.beforeEach((to,from,next) => {
  // to 将要访问的路径
  // from 代表来自哪个路径
  // next 是一个函数，代表放行，参数代表强制跳转
  if(to.path === '/login')
    return next()
  if(from === '/login')
    return next()
  else return next('/login')
})
*/

export default router
