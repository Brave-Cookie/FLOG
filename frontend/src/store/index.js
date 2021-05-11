import { createStore } from 'vuex'
import axios from 'axios'
// 라우터랑 동일한 방식으로 export
export const store = createStore ({
  state: {
    accessToken: null,
    //user_name: null, // 엑세스 토큰과 함께 로그인한 유저 이름을 받아옴 -> 이게 맞나?
  },
  
  getters: { },

  mutations: {
    LOGIN(state, { accessToken }) {
      // { accessToken }: 백엔드에서 넘겨준 토큰인가봄
      // payload라고 하는 추가 인자임
      state.accessToken = { accessToken }
    },

    LOGOUT(state) {
      // 로그아웃 시에는 토큰을 null로 초기화해준다.
      state.accessToken = null
    },

    // mutation의 핸들러 호출은 store.commit을 통해서!
  },

  actions: {
    /*
     액션은 this.$store.dipatch(이름)으로 호출됨(Login.vue에 보면 그렇게 사용중)

     정리: 액션에서 비동기적으로 필요한 일들을 수행
     이후 상태변이를 기록
    */
    LOGIN({ commit }, { user_id, user_pw }) {
      console.log('여기는 스토어 ', user_id)
      console.log('여기는 스토어 ', user_pw)
      return axios
        .post('/api/auth/login', { user_id, user_pw })
        .then(({ data }) => commit("LOGIN", data))
    },
    LOGOUT({ commit }) {
      commit("LOGOUT")
    },
  },
})