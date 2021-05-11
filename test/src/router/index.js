//import { createRouter, createWebHistory } from 'vue-router'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Mypage from '../views/Mypage.vue'
import Vue from 'vue'

Vue.use(VueRouter);

const requireAuth = (to, from, next) => {
  const isAuth = false //localStorage.getItem('token')
  isAuth ? next() : next('/')
  if (isAuth==false) {
    alert('로그인이 필요한 서비스입니다.')
  }
}

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
  
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/mypage',
      name: 'Mypage',
      component: Mypage,
      // 인증 후에만 접근할 수 있음
       beforeEnter: [requireAuth]
      // 메타 필드
      // meta: { requiresAuth: true }
    }
  
    /*
      // dynamic segments start with a colon
    { path: '/users/:id', component: User }, // 유저 이름을 동적으로 url에 사용, :id 부분에 id가 들어감
    */
  ]
});


export default router