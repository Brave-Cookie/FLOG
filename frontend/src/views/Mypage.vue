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
            <button @click="registProject()">생성하기</button>
            <button @click="closeModal()">창 닫기</button>
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
            <button @click="closeModal()">창 닫기</button>
          </template>
        </Modal>
    </div>


    <div id="list">
      <h3>나의 프로젝트</h3>
      <hr color="#b9bada" noshade="noshade" size="1">

      <ul id="project_list">
        <li id="prject_item" v-for="(project, id) in project_list" v-bind:key="id" @click="enterProject(project.id)">
          {{ project.name }}
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
// jwt 해독하는 모듈
import jwt_decode from 'jwt-decode';
import Modal from "../components/Modal";
import { createProject, getProject } from '../api/axios';

export default {
	data() {
		return {
      user_name: '',
      user_id: '',
      
      project_name: '',
      meeting_code: '',
      projectModal: false,
      meetingModal: false,

      project_list: [
        { name: 'testPJ', id:'0'}
        //'test'
      ],

		}; 
	},

  components: {
    Modal,
  },

  methods: {
    getUserInfo() {
      const token = localStorage.accessToken;

      this.user_name = jwt_decode(token).user_name;
      this.user_id = jwt_decode(token).user_id;
    },

    async registProject() {
      if(this.project_name.length > 0)
      {
        // 서버에 요청을 보내는 경우는 모두 비동기 처리해주기 
        const res = await createProject(this.user_id, this.project_name);
        if (res.status == 200) 
        {
          alert('프로젝트가 생성되었습니다.');
        }
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
        alert(this.meeting_code);
        this.meeting_code="";
        this.meetingModal=false;
      } 
      else
      {
        alert("코드를 입력해주세요.")
      }
    },

    closeModal() {
      this.projectModal=false;
      this.meetingModal=false;
    },

    async getProjectList() {
      const res = await getProject(this.user_id);
      // 프로젝트가 없으면 없다고 띄우는것도 좋을듯
      for(var i=0; i<res.data.list.length; i++){
        // push(i)가 맞..나...?
        this.project_list.push(i);
      }
    },

    enterProject(project_id) {
      this.$router.push({name: 'Project', params: {projectId : project_id}});
      //this.$router.push('/mypage/:userId/project');
    }
  },

  created() {
    // localstorage.accessToken에서 해독 
    //--> { user_id: "test", user_name: "test", user_email: "test", iat: 1620816476 } iat는 무시
    // 함수 쓸때 제발 this. 으로 시작하기
    this.getUserInfo();
    this.getProjectList();
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

  #project_list {
    font-size: medium;
  }

</style>
