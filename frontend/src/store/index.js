import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex);

export const store = new Vuex.Store({
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
    // 그리고 얘는 무조건 동기 통신임
  },
  actions: {
    LOGIN({ commit }, { user_id, user_pw }) {
      return axios
        .post('/api/auth/login', { user_id, user_pw })
        .then(({ data }) => {
          commit("LOGIN", data)})
    },
    LOGOUT({ commit }) {
      commit("LOGOUT")
    },
  },
})
