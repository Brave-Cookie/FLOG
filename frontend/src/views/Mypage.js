import React, { useState } from 'react';
import HeaderAuth from '../components/HeaderAuth';
//import Modal from '../components/Modal';
import jwt_decode from 'jwt-decode';
//import { useParams } from 'react-router';
import { createProject } from '../api/axios.js'

import Modal from 'react-awesome-modal';

async function register(user_id, project_name) {
    var res = await createProject(user_id, project_name);
    console.log(res.status);
    
    return res;
}
function Mypage(props) {
    let name = jwt_decode(localStorage.accessToken).user_name;
    let id = jwt_decode(localStorage.accessToken).user_id;
    const [user, set_user] = useState(name);
    const [user_id, set_id] =useState(id);
    const [projectModal, set_projectModal] = useState(false);
    const [codeModal, set_codeModal] = useState(false);
    const [project_name, set_project] = useState("");
    const [meeting_code, set_code] = useState("");
    const [project_list, set_projectList] = useState({
        project_id: "",
        project_name: ""
      });

    const onUserHandler = (event) => {
        set_user(event.currentTarget.value);
    }
    const onIdHandler = (event) => {
        set_id(event.currentTarget.value);
    }
    const onProjectHandler = (event) => {
        set_project(event.currentTarget.value);
    }
    const onCodeHandler = (event) => {
        set_code(event.currentTarget.value);
    }
    const onListHandler = (event) => {
        set_projectList(event.currentTarget.value);
    }
    const openProjectModal = () => {
        set_projectModal(true);
    }
    const openCodeModal = () => {
        set_codeModal(true);
    }
    const closeModal = () => {
        set_projectModal(false);
        set_codeModal(false);
    }

    const registProject = () => {
        if(project_name!==""){
            const res = register(user_id, project_name);
            console.log(res.status);
            // clear
            set_project("");
            set_projectModal(false);
        }
        else {
            alert('프로젝트명을 입력해주세요.')
        }
    }
    const enterMeeting = () => {
        if(meeting_code!==""){
            alert(meeting_code);

            set_code("");
            set_codeModal(false);
        }
        else {
            alert('코드를 입력해주세요');
        }
    }

    return(
        <div className="content">
            <HeaderAuth />
            <br />
            <h3>'{user}'님 환영합니다 :)</h3> 

            <button onClick={openProjectModal}>프로젝트 생성</button>           
            <Modal visible={projectModal} width="300" height="200" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                <div>
                    <h4>프로젝트의 이름을 입력해주세요.</h4>
                    <br />
                    <input type="text" value={project_name} onChange={onProjectHandler} />
                    <br /><br />
                    <button className="close" onClick={registProject}>생성하기</button>
                    <button className="close" onClick={closeModal}>창 닫기</button>
                </div>
            </Modal>
            
            <button onClick={openCodeModal}>회의 참여하기</button>           
            <Modal visible={codeModal} width="300" height="200" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                <div>
                    <h4>회의 코드를 입력해주세요.</h4>
                    <br />
                    <input type="text" value={meeting_code} onChange={onCodeHandler} />
                    <br /><br />
                    <button className="close" onClick={enterMeeting}>입장하기</button>
                    <button className="close" onClick={closeModal}>창 닫기</button>
                </div>
            </Modal>
            <br />

            <div className="list">
                <h3>나의 프로젝트</h3>
                <hr color="#b9bada" noshade="noshade" size="1"></hr>
                
                <ul className="project-list">
                    <li className="prject_item">
                    
                    
                    
                    </li><br />
                </ul>
            </div>


        </div>
        
    )
}

export default Mypage;