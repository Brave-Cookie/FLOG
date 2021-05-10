// import Vue from "vue"
// import Vuex from "vuex"
// import axios from "axios"

// Vue.use(Vuex);

// export const store = new Vuex.Store({
//   state: {
//     accessToken: null,
//   },
//   getters: {
//     /*
//      속성 계산 가능, 첫 번째 인자로 state를 받고,
//      두 번째 인자로 다른 getters도 받을 수 있음
//      컴포넌트에서 접근은 this.$store.getters.지정한 함수 이름
//     */
//   },
//   mutations: {
//     // veux 저장소에서 실제로 상태를 변경(이벤트와 유사)
//     // 첫 번째 파라미터로 상태를 받는다

//     LOGIN(state, { accessToken }) {
//       // { accessToken }: 백엔드에서 넘겨준 토큰인가봄
//       // payload라고 하는 추가 인자임
//       state.accessToken = { accessToken }
//     },

//     LOGOUT(state) {
//       // 로그아웃 시에는 토큰을 null로 초기화해준다.
//       state.accessToken = null
//     },

//     // mutation의 핸들러 호출은 store.commit을 통해서!
//     // 그리고 얘는 무조건 동기 통신임
//   },
//   actions: {
//     /*
//      mutation이랑 비슷하지만, 상태를 변이시키는게 아니고
//      액션으로 변이에 대한 커밋을 한다.
//      또한 비동기 작업 가능

//      인자로 함수와 속성 세트를 가진 context객체를 받음
//      context.commit이나 context.getters를 통해 접근

//      코드 단순화를 위해 전달인자 분해를 사용
//      -> commit 같은 경우, { commit }

//      액션은 this.$store.dipatch(이름)으로 호출됨(Login.vue에 보면 그렇게 사용중)
//      그냥 store.commit()하면 안돼? -> 상태변이는 동기적임
//      비동기 작업을 하려면 저렇게 하는게 맞음

//      정리: 액션에서 비동기적으로 필요한 일들을 수행
//      이후 상태변이를 기록
//     */
//     LOGIN({ commit }, { user_id, user_pw }) {
//       return axios
//         .post('/api/auth/login', { user_id, user_pw })
//         .then(({ data }) => commit("LOGIN", data))
//     },
//     LOGOUT({ commit }) {
//       commit("LOGOUT")
//     },
//   },
// })