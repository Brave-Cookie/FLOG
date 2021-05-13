import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"


Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    accessToken: null,
  },
  getters: { },
  mutations: {
    LOGIN(state, { accessToken }) {
      // { accessToken }: 백엔드에서 넘겨주는 토큰
      state.accessToken = accessToken;
      localStorage.accessToken = accessToken;
    },

    LOGOUT(state) {
      // 로그아웃 시에는 토큰을 null로 초기화해준다.
      state.accessToken = null;
      delete localStorage.accessToken;
    },
  },
  actions: {
    LOGIN({ commit }, { user_id, user_pw }) {
      return axios
        .post('/api/auth/login', { user_id, user_pw })
        //.then(({ data }) => {
        //  commit("LOGIN", data)
        //})
        .then(
          (response) => {
            if(response.status==202){
              if(response.data.code=='login_1')
              {
                alert('가입되지 않은 아이디입니다.')
              }
              else if(response.data.code=='login_2')
              {
              alert('비밀번호가 일치하지 않습니다.')
              }
            }

            else{
              commit("LOGIN",response)
            }
        }
        )
    },
    LOGOUT({ commit }) {
      commit("LOGOUT")
    },
  },
})

