import { createStore } from 'vuex'
import AUTH from './modules/auth'
// 라우터랑 동일한 방식으로 export
export const store = createStore ({
  modules: { AUTH }
})


// export default store