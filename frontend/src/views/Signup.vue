<template>
  <div>
    <h2>회원가입</h2>
    <!-- prevent는 새로고침 방지 -->
    <form id='content' @submit.prevent="submitForm">
      <div>
				<label for="name">이름 </label>
        <!-- v-model: data 속성과 연결 -->
				<input type="text" id="name" v-model="name" />
			</div>
      <div>
				<label for="id">아이디 </label>
				<input type="text" id="id" v-model="id" />
			</div>
			<div>
				<label for="email">이메일 </label>
				<input type="text" id="email" v-model="email" />
			</div>
			<div>
				<label for="password">비밀번호 </label>
				<input type="password" id="password" v-model="password" />
			</div>
			<div>
				<label for="passwordConfirm">비밀번호 확인 </label>
				<input type="password" id="passwordConfirm" v-model="passwordConfirm" />
				<div v-if="!passwordCheck"> 비밀번호가 동일하지 않습니다. </div>
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
      name: '',
      id: '',
			email: '',
			password: '',
			passwordConfirm: '',
		};
	},

	methods: {
	  async submitForm() {
      // 전달할 데이터
      const userData = {
        name: this.name,
        id: this.id,
        email: this.email,
        password: this.password,
      }

      const response = await registerUser(userData);
      if(response.state == 200){
        alert('Hello World!');
        this.$router.push('/login');
      }
      else {
        alert(response.data)
      }
	  console.log('회원가입이 완료되었습니다.');
	  },

	  passwordCheck () { 
		if (this.signup.password === this.passwordCheck) {
			this.passwordCheckFlag = true 
		  } 
		else { 
			this.passwordCheckFlag = false
		  }
	  }


	},
};
</script>

<style scoped>

</style>
