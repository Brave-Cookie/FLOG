<template>
  <div id='content'>
    <h2>회원가입</h2>
    <!-- prevent는 새로고침 방지 -->
    <form id='content' @submit.prevent="submitForm">		
      <div>
				<label for="user_name">이름 </label>
        <!-- v-model: data 속성과 연결 -->
				<input type="text" id="user_name" v-model="user_name" />
			</div>
      <div>
				<label for="user_id">아이디 </label>
				<input type="text" id="user_id" v-model="user_id" />
			</div>
			<div>
				<label for="user_email">이메일 </label>
				<input type="text" id="user_email" v-model="user_email" />
			</div>
			<div>
				<label for="user_pw">비밀번호 </label>
				<input type="password" id="user_pw" v-model="user_pw" />
			</div>
			<div>
				<label for="pwConfirm">비밀번호 확인 </label>
				<input type="password" id="pwConfirm" v-model="pwConfirm" />

			</div>
      <br>
			<button type="submit">가입하기</button>
		</form>


  </div>
</template>

<script>
import { registerUser } from '@/api/axios';
export default {
	name: 'SignupForm',
	
	data() {
		return {
      user_name: '',
      user_id: '',
			user_email: '',
			user_pw: '',
			pwConfirm: '',
		}; 
	},

	methods: {
		async submitForm() {
      // 전달할 데이터
      const userData = {
        user_name: this.user_name,
        user_id: this.user_id,
        user_email: this.user_email,
        user_pw: this.user_pw,
        pwConfirm: this.pwConfirm,
      }
      if (!this.checkForm()){
        // 모든 데이터를 정상적으로 입력하지 않으면 실행하지 않음
        return false;
      }
      const response = await registerUser(userData);

      if(response.status == 200){
        alert('회원가입이 완료되었습니다. 로그인 화면으로 이동합니다.');
        this.$router.push('/login');
      }
      else if(response.status == 202){
        if(response.data.code=='resgister_1'){
          alert('중복된 아이디가 존재합니다.')
        }
      }
		
	  },

  	checkForm() {
      this.errors = [];

      if (!this.user_name) {
        this.errors.push("이름을 입력하세요.");
		    alert("이름을 입력하세요.");
        return false;
      }
      if (!this.user_email) {
        this.errors.push('이메일을 입력하세요.');
		    alert('이메일을 입력하세요.');
        return false;
      }
		  if (!this.user_pw) {
        this.errors.push('비밀번호를 입력하세요.');
	    	alert('비밀번호를 입력하세요.');
        return false;
      } else if (!this.checkPW(this.user_pw, this.pwConfirm)) {
        this.errors.push('비밀번호가 일치하지 않습니다.');
		    alert('비밀번호가 일치하지 않습니다.');
        return false;
      }

      if (!this.errors.length) {
        return true;
      }
      else return false;

    },

	  checkPW(user_pw, pwConfirm) {
      return (user_pw==pwConfirm);
    }
  },

};
</script>

<style scoped>
  #content {
    text-align: center;
  }

  #content h2 {
    text-align: center;
  }

</style>
