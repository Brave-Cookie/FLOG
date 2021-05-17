<template>
  <div id='content'>
    <h2>Login</h2>
    <form @submit.prevent="onSubmit(user_id, user_pw)">
      <input type="text" v-model="user_id" placeholder="ID" />
      <input type="password" v-model="user_pw" placeholder="Password" />
      <input type="submit" value="Login" />
      <!--<p><i>{{msg}}</i></p>-->
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
      code: "",
    }
  },

    methods: {
      onSubmit: function(user_id, user_pw){
        // LOGIN action 실행
        this.$store.dispatch("LOGIN", { user_id, user_pw })
          .then(() => {
              this.redirect()
              })
          .catch(({ code }) => (this.code = code))

      },
      redirect() {
        //this.$router.push('/mypage/'+this.user_id);
        this.$router.push({name: 'Mypage', params: {userId : this.user_id}});
      }
    },
}
</script>

<style scoped>
  #content {
    text-align: center;
  }

</style>