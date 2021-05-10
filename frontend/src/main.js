import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
// import axios from 'axois'

createApp(App).use(router, store).mount('#app')
/*// App.vue 객체 생성
const app = createApp(App)

// 라우터 달아주기
app.use(router)

// App 실행
app.mount('#app')*/

// axios - 백엔드와 통신하는 모듈 달아주기
// app.use(VueAxios, axios)