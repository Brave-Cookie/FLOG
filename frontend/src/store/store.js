import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

const resourceHost = "http://localhost:3000/api"

export default new Veux.Store({
  state: {
    accessToken: null,
  },
  getters: {},
  mutations: {
    LOGIN(state, { accessToken }) {
      state.accessToken = accessToken
    },
    LOGOUT(state) {
      state.accessToken = null
    },
  },
  actions: {
    LOGIN({ commit }, { email, password }) {
      return axios
        .post(`${resourceHost}/login`, { email, password })
        .then(({ data }) => commit("LOGIN", data))
    },
    LOGOUT({ commit }) {
      commit("LOGOUT")
    },
  },
})