// vue3부터는 라우터 생성 방식이 바뀜

import { createWebHistory, createRouter } from 'vue-router';
import Index from './views/index.vue'
import Next from './views/next.vue'
import Next2 from './views/next2.vue'
import Chk_db from './views/chk_db.vue'


const routes = [
  {
    path: "/",
    component: Index,
  },
  {
    path: "/next",
    component: Next,
    // nested router : 하위 라우터 설정
    children: [
      {
        path: "next2",
        component: Next2,
    },
    ]
  },
  {
    path: "/chk_db",
    component: Chk_db,
  },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;



/*

// vue 관련 모듈과 라우터 관련 기본 모듈
import { createRouter, createWebHistory } from 'vue-router'
import Index from './views/index.vue'
import Next from './views/next.vue'

const routerHistory = createWebHistory()
//

// 라우터 생성n
const router = createRouter({
 history: routerHistory,
 routes: [
   {
     path: '/',
     component: Index
   },
   {
    path: '/next',
    component: Next 
   },
 ]
})

export default router
*/



