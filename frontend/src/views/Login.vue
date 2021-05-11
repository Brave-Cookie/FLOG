<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="onSubmit(user_id, user_pw)">
      <input type="text" v-model="user_id" placeholder="ID" />
      <input type="password" v-model="user_pw" placeholder="Password" />
      <input type="submit" value="Login" />
      <p><i>{{msg}}</i></p>
      <br><br>
      <router-link to="/signup">회원가입</router-link>
    </form>
  </div>
</template>

<script>

export default {
  // 이 폴더의 별명 지정(필수아님)
  name: 'Login',
  
    data() {
      return {
        user_id: "",
        user_pw: "",
        msg: "",
      }
    },
    methods: {
      onSubmit(user_id, user_pw){
        console.log(user_id)
        console.log(user_pw)
        // LOGIN action 실행
        this.$store.createStore().dispatch("LOGIN", { user_id, user_pw })
          .then(() => this.redirect())
      },
      redirect() {
        // url이 블로그의 코드랑은 다른것 같아서 일단 파싱 안하고 로그인 성공후 마이페이지로 넘어가게함
        // message가 필요한가?

        // 경로가 mypage:id 처럼 접속한 사람 정보를 가지고 있는게 맞는거 같음
        this.$router.push("/mypage")
      }
      /*onSubmit(user_id, user_pw) {
        // LOGIN 액션 실행
        this.$store
          .dispatch("LOGIN", { user_id, user_pw })
          .then(() => this.redirect())
          .catch(({ message }) => (this.msg = message))
      },
      redirect() {
        const { search } = window.location
        const tokens = search.replace(/^\?/, "").split("&")
        const { returnPath } = tokens.reduce((qs, tkn) => {
          const pair = tkn.split("=")
          qs[pair[0]] = decodeURIComponent(pair[1])
          return qs
        }, {})

        // 리다이렉트 처리
        this.$router.push(returnPath)
      },*/
    },
}
</script>