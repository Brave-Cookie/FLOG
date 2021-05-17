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

      <ul id="project-list">
        <li id="prject_item" v-for="(project, id) in project_list" v-bind:key="id">
          <router-link :to='`/${user_id}/project/${project.project_id}/home`'>
            {{ project.project_name }}
          </router-link>
        </li><br>
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

      project_list: [ ],
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
      console.log(res.data.list)
      for(var i=0; i<res.data.list.length; i++){
        this.project_list.push(res.data.list[i]);
      }
    },
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

  #project-list {
    font-size: 18px;
  }

  #list a{
    color: #293046;
    text-decoration: none;
  }

</style>
