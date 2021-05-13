<template>
    <div id='header'> 
        <div id='menuWrap'>
        <router-link to="/">Home  </router-link> 
        <router-link v-if="!getAuth()" to="/login">Login  </router-link>
        <router-link v-if="getAuth()" to="/mypage">Mypage  </router-link> 
        <a v-if="getAuth()" @click.prevent="onClickLogout()">Logout</a>
        </div>
    </div>
</template>

<script>
export default {
    data: {

    },
    methods: {
      getAuth() {
        if(localStorage.accessToken)
        {
          return true;
        }
        else
        {
          return false;
        }
      },

      onClickLogout() {
        this.$store.dispatch("LOGOUT").
          then(() => this.$router.push("/"));

        alert("로그아웃되었습니다. 홈으로 돌아갑니다.")
      },
    },

    updated: function() {
      isAuth();
    }
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