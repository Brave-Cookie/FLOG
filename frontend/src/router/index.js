import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Mypage from '../views/Mypage.vue'
import Vue from 'vue'

Vue.use(VueRouter);

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
       beforeEnter: (to, from, next) => {
        var isAuth = false 
        if(localStorage.getItem('accessToken')){
          isAuth = true
        }
        isAuth ? next() : next('/')
        if (isAuth==false) {
          alert('로그인이 필요한 서비스입니다.')
        }
      }
    }
  ]
});


export default router
