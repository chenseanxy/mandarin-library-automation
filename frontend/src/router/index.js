import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminLogin from '../components/AdminLogin.vue'
import AdminWelcome from '../components/AdminWelcome.vue'
import AdminHome from '../components/AdminHome.vue'

import ReaderLogin from '../components/ReaderLogin.vue'
import ReaderRegisterAccount from '../components/Reader/ReaderRegisterAccount.vue'
import ReaderChangePassword from '../components/Reader/ReaderChangePassword.vue'
import ReaderWelcome from '../components/ReaderWelcome.vue'
import ReaderHome from '../components/ReaderHome.vue'
import ReaderSearchBook from '../components/Reader/ReaderSearchBook.vue'
import ModifyPersonalInformation from '../components/Reader/ModifyPersonalInformation.vue'
import ReaderCurrentBorrow from '../components/Reader/ReaderCurrentBorrow.vue'
import ReaderReturnedBooks from '../components/Reader/ReaderReturnedBooks.vue'


import LibrarianHome from '../components/LibrarianHome.vue'
import LibrarianWelcome from '../components/LibrarianWelcome.vue'
import LibrarianAddBook from '../components/Librarian/AddBook.vue'
import LibrarianSearchBook from '../components/Librarian/SearchBook.vue'
import LibrarianViewLog from '../components/Librarian/ViewLog.vue'
import LibrarianRegisterAccount from '../components/Librarian/RegisterAccount.vue'
import LibrarianEditAccount from '../components/Librarian/EditAccount.vue'
import LibrarianBookRecording from '../components/Librarian/BookRecording.vue'
import LibrarianFromalities from '../components/Librarian/Fromalities.vue'
import LibrarianIncomeRecord from '../components/Librarian/IncomeRecord.vue'
import LibrarianAnnouncement from '../components/Librarian/Announcement.vue'
import LibrarianLogin from '../components/LibrarianLogin.vue'
import MainPage from '../components/MainPage.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/MainPage' },
  { path: '/MainPage', component: MainPage },
  { path: '/Login', component: ReaderLogin },
  { path: '/ReaderChangePassword',component: ReaderChangePassword },
  { path: '/ReaderRegisterAccount',component: ReaderRegisterAccount },
  {
    path: '/ReaderHome',
    component: ReaderHome,
    redirect: '/ReaderHome/Welcome',
    children: [
      { path: '/ReaderHome/Welcome', component: ReaderWelcome },
      { path: '/ReaderHome/ReaderSearchBook', component: ReaderSearchBook },
      { path: '/ReaderHome/ModifyPersonalInformation', component: ModifyPersonalInformation },
      { path: '/ReaderHome/ReaderCurrentBorrow', component: ReaderCurrentBorrow },
      { path: '/ReaderHome/ReaderReturnedBooks', component: ReaderReturnedBooks }
    ]
  },
  
  { path: '/LibrarianLogin', component: LibrarianLogin },
  {
    path: '/LibrarianHome',
    component: LibrarianHome,
    redirect: '/LibrarianHome/Welcome',
    children: [
      { path: '/LibrarianHome/Welcome', component: LibrarianWelcome },
      { path: '/LibrarianHome/AddBook', component: LibrarianAddBook },
      { path: '/LibrarianHome/SearchBook', component: LibrarianSearchBook },
      { path: '/LibrarianHome/RegisterAccount', component: LibrarianRegisterAccount },
      { path: '/LibrarianHome/EditAccount', component: LibrarianEditAccount },
      { path: '/LibrarianHome/BookRecording', component: LibrarianBookRecording },
      { path: '/LibrarianHome/Fromalities', component: LibrarianFromalities },
      { path: '/LibrarianHome/IncomeRecord', component: LibrarianIncomeRecord },
      { path: '/LibrarianHome/Announcement', component: LibrarianAnnouncement },
      { path: '/LibrarianHome/ViewLog', component: LibrarianViewLog }
    ]
  },
  { path: '/AdminLogin', component: AdminLogin },
  {
    path: '/AdminHome',
    component: AdminHome,
    redirect: '/AdminHome/Welcome',
    children: [
      { path: '/AdminHome/Welcome', component: AdminWelcome }
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
