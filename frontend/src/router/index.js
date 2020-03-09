import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminLogin from '../components/AdminLogin.vue'
import AdminHome from '../components/AdminHome.vue'
import ReaderLogin from '../components/ReaderLogin.vue'
import ReaderHome from '../components/ReaderHome.vue'
import LibrarianHome from '../components/LibrarianHome.vue'
import LibrarianWelcome from '../components/LibrarianWelcome.vue'
import LibrarianAddBook from '../components/Librarian/AddBook.vue'
import ReaderWelcome from '../components/ReaderWelcome.vue'
import AdminWelcome from '../components/AdminWelcome.vue'

Vue.use(VueRouter)

const routes = [
  {path:'/', redirect: '/Login'},
  {path: '/Login', component: ReaderLogin},
  {
    path: '/ReaderHome', 
    component: ReaderHome,
    redirect: '/ReaderHome/Welcome',
    children:[
      {path: '/ReaderHome/Welcome', component: ReaderWelcome}
    ]
  },
  {
    path: '/LibrarianHome', 
    component: LibrarianHome, 
    redirect: '/LibrarianHome/Welcome',
    children:[
      {path: '/LibrarianHome/Welcome', component: LibrarianWelcome},
      {path: '/LibrarianHome/AddBook', component: LibrarianAddBook}
    ]
  },
  {path: '/AdminLogin', component: AdminLogin},
  {
    path: '/AdminHome', 
    component: AdminHome,
    redirect: '/AdminHome/Welcome',
    children:[
      {path: '/AdminHome/Welcome', component:AdminWelcome}
    ]
  }
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
