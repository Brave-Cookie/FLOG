import { AUTH } from '../mutation-types'
import axios from 'axios'


const state = {
    accessToken: null,
    //user_name: null, // 엑세스 토큰과 함께 로그인한 유저 이름을 받아옴 -> 이게 맞나?
}

const getters = {

}

const mutations = {
    [AUTH.LOGIN](state, { accessToken }) {
        // { accessToken }: 백엔드에서 넘겨준 토큰인가봄
        // payload라고 하는 추가 인자임
        state.accessToken = { accessToken }
      },
  
      [AUTH.LOGOUT](state) {
        // 로그아웃 시에는 토큰을 null로 초기화해준다.
        state.accessToken = null
      },
}

const actions = {
    LOGIN({ commit }, { user_id, user_pw }) {
        return axios
          .post('/api/auth/login', { user_id, user_pw })
          .then(({ data }) => commit(AUTH.LOGIN, data))
      },
      LOGOUT({ commit }) {
        commit(AUTH.LOGOUT)
      },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}