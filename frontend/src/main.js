// main.js는 vue 프로젝트의 전반적인 세팅 파일임.

// 참조할 모듈들
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'


// vue2와 방식 아예 다름.
// 참고 : https://www.vuemastery.com/blog/vue-router-a-tutorial-for-vue-3/

// App.vue 객체 생성
const app = createApp(App)

// 라우터 달아주기
app.use(router)
// axios - 백엔드와 통신하는 모듈 달아주기
app.use(VueAxios, axios)

// App 실행
app.mount('#app')






