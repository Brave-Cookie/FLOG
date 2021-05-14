<template>
  <div id="content">
    <h2>Mypage</h2>
    <header>'{{ user_name }}'님 환영합니다 :)</header>
    <br>
    
    <div id="buttons">
      <button @click="projectModal = true" type="button">프로젝트 생성</button>
        
        <Modal v-if="projectModal" @close="projectModal = false">
          <h4 slot="header">프로젝트 생성</h4>
          <p slot="body">
            프로젝트의 이름을 입력해주세요.
            <input type="text" v-model="project_name" />
          </p>
          <template slot="footer">
            <button @click="createProject()">생성하기</button>
          </template>

        </Modal>

      <button @click="meetingModal = true" type="button">회의 참여하기</button>
        <Modal v-if="meetingModal" @close="meetingModal = false">
          <h4 slot="header">회의 참여하기</h4>
          <p slot="body">
            회의 코드를 입력하세요.
            <input type="text" v-model="meeting_code" />
          </p>
          <template slot="footer">
            <button @click="joinMeeting()">참여하기</button>
          </template>
        </Modal>
    </div>


    <div id="list">
      <h3>나의 프로젝트</h3>
      <hr color="#b9bada" noshade="noshade" size="1">
    </div>
  </div>
</template>


<script>
// jwt 해독하는 모듈
import jwt_decode from 'jwt-decode';
import Modal from "../components/Modal";

export default {
	data() {
		return {
      user_name: '',
      
      project_name: '',
      meeting_code: '',
      projectModal: false,
      meetingModal: false,
		}; 
	},

  components: {
    Modal,
  },

  methods: {
    getUserName() {
      const token = localStorage.accessToken;

      this.user_name = jwt_decode(token).user_name;
    },

    createProject() {
      if(this.project_name.length > 0)
      {
        //this.$emit("createProject", this.project_name);
        alert(this.project_name);
        // clear input
        this.project_name="";
        this.projectModal=false;
      } 
      else
      {
        alert("프로젝트 이름을 입력해주세요.")
      }
    },

    joinMeeting() {
      if(this.meeting_code.length > 0)
      {
        //this.$emit("createProject", this.project_name);
        alert(this.meeting_code);
        this.meeting_code="";
        this.meetingModal=false;
      } 
      else
      {
        alert("코드를 입력해주세요.")
      }
    },

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

  #list {
    text-align: left;
    margin-left: 14rem;
    margin-right: 14rem;
    color: #2c3e50;
  }

</style>
