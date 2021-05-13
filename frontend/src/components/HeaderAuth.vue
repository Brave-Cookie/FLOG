<!-- 로그인 후에 사용할 헤더 -->
<template>
    <div id='header'> 
        <div id='menuWrap'>
        <router-link to="/mypage">Mypage</router-link> |
        <router-link to="/">Home</router-link> |
        <a @click.prevent="onClickLogout()">Logout</a>
        </div>
    </div>
</template>

<script>
//import store from "../store"
export default {
    data: {},
    methods: {
        onClickLogout() {
          this.$store.dispatch("LOGOUT").
            then(() => this.$router.push("/"));

          alert("로그아웃되었습니다. 홈으로 돌아갑니다.")
        }
    },
}
</script>

<!-- scoped 형태로 클래스 선언하면 해당 컴포넌트 내에서만 사용가능  -->
<style>
  #header {
    background-color: #b9bada;
    width:auto;
    height:3rem;
  }

  #menuWrap {
    text-align: right;
    margin-right:1rem;
  }
</style>