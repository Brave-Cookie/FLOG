<!-- 로그인 후에 사용할 헤더 -->
<template>
    <div id='header'> 
        <div id='menuWrap'>
        <a @click="goMypage()">Mypage</a> |
        <a @click.prevent="onClickLogout()">Logout</a>
        </div>
    </div>
</template>

<script>
//import store from "../store"
import jwt_decode from 'jwt-decode';
export default {
    methods: {
        goMypage(){
          let user_id = jwt_decode(localStorage.accessToken).user_id;
          this.$router.push({name: 'Mypage', params: {userId : user_id}});
        },
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
    background-color: #9172F6;
    width:auto;
    height:3rem;
    color: #FFFFB9;
  }

  #menuWrap {
    text-align: right;
    margin-right:1rem;
  }

  #menuWrap a.router-link-exact-active {
  color: #6D42F8;
  }
  
</style>