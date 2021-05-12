<template>
  <div id="content">
    <h2>Mypage</h2>
    <header>'{{ user_name }}'님 환영합니다 :)</header>
  </div>
</template>


<script>
// jwt 해독하는 모듈
import jwt_decode from 'jwt-decode';

export default {
	data() {
		return {
      user_name: ''
		}; 
	},

  methods: {
    getUserName() {
      const token = localStorage.accessToken;

      this.user_name = jwt_decode(token).user_name;
    }
  },

  created() {
    // 1. data()의 user_name 호출
    // 2. localStorage.accessToken : 브라우저의 로컬스토리지에 저장된 암호화된 accessToken을 불러옴
    // 3. 그 토큰을 jwt-decode 모듈로 해독 --> { user_id: "test", user_name: "test", user_email: "test", iat: 1620816476 } iat는 무시.
    // 4. 해독한 payload에서 user_name만 추출
    // 이 과정을 하나의 함수로 만들어서 따로 빼놔야할듯!!
    //this.user_name = jwt_decode(localStorage.accessToken).user_name;
    this.getUserName();
  }

}

</script>

<style scoped>
  #content {
    text-align: center;
  }

</style>