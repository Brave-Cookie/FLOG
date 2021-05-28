import React, { useEffect, useState } from 'react';
import HeaderAuth from '../components/HeaderAuth';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { createProject } from '../api/axios.js'
import axios from 'axios'
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
    const [user_id, set_id] = useState(id);
    const [projectModal, set_projectModal] = useState(false);
    const [codeModal, set_codeModal] = useState(false);
    const [project_name, set_project] = useState("");
    const [meeting_code, set_code] = useState("");
    const [projects, set_projects] = useState([]);
    const [meeting_name, set_meetingName] = useState("");

    const [input, set_input] = useState(0);

    useEffect(() => {
        axios.get('https://localhost:3000/api/project/list/' + user_id)
            .then(res => {
                set_projects(res.data.list);
            })
        console.log(projects);
    }, []);

    /*const onUserHandler = (event) => {
        set_user(event.currentTarget.value);
    }
    const onIdHandler = (event) => {
        set_id(event.currentTarget.value);
    }*/
    const onProjectHandler = (event) => {
        // 프로젝트 모달
        set_project(event.currentTarget.value);
    }
    const onCodeHandler = (event) => {
        // 코드 모달
        set_code(event.currentTarget.value);
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
        if (project_name !== "") {
            const res = register(user_id, project_name);
            alert('프로젝트가 생성되었습니다.');
            // clear
            set_project("");
            set_projectModal(false);

            window.location.replace('/mypage/' + user_id);

        }
        else {
            alert('프로젝트명을 입력해주세요.')
        }
    }
    const enterMeeting = () => {
        if (meeting_code !== "") {
            let res = axios.get('https://localhost:3000/api/auth/check/' + meeting_code)
                .then((res) => {
                    if(res.status === 200){
                        let meeting_name = res.data.meeting_name;
                        let room_state = 'join';
                        window.location = `/mypage/${user_id}/meetingRoom/${room_state}/${meeting_name}/${meeting_code}`
                    }
                    else {
                        alert('존재하지 않는 회의')
                    }
                })

            set_code("");
            set_codeModal(false);
        }
        else {
            alert('코드를 입력해주세요');
        }
    }

    console.log(projects);
    return (
        <div className="content">
            <HeaderAuth />
            <br /><br /><br />
            <h3>'<Link to={`/mypage/${user_id}`}>{user}</Link>'님 환영합니다 :)</h3>
            <div className="mypage-buttons">
                <button onClick={openProjectModal} className="create-project-button">
                    <h3 className="create-project-title">프로젝트 생성</h3>
                    <p>프로젝트 폴더를 만들어 회의를 관리해보세요.</p>
                </button>

                <button onClick={openCodeModal} className="join-meeting-button">
                    <h3 className="join-meeting-title">회의 참여하기</h3>
                    <p>코드를 입력하면 바로 회의에 참여할 수 있어요.</p>
                </button>
            </div>
            <Modal visible={projectModal} width="300" height="170" effect="fadeInUp">
                <div>
                    <h4>프로젝트의 이름을 입력해주세요.</h4>
                    <br />
                    <input type="text" value={project_name} onChange={onProjectHandler} />
                    <br /><br />
                    <button className="close-button" onClick={registProject}>생성하기</button>
                    <button className="close-button" onClick={closeModal}>창 닫기</button>
                </div>
            </Modal>

            <Modal visible={codeModal} width="300" height="170" effect="fadeInUp">
                <div>
                    <h4>회의 코드를 입력해주세요.</h4>
                    <br />
                    <input type="text" value={meeting_code} onChange={onCodeHandler} />
                    <br /><br />
                    <button className="close-button" onClick={enterMeeting}>입장하기</button>
                    <button className="close-button" onClick={closeModal}>창 닫기</button>
                </div>
            </Modal>

            <div className="list">
                <h3>나의 프로젝트</h3>
                <hr color="#b9bada" noshade="noshade" size="1"></hr>

                <ul className="project-list">
                    {projects.map((project, id) => (
                        <li className="project-item" key={id}>
                            <Link to={`/${user_id}/project/${project.project_id}/${project.project_name}`}>{project.project_name}</Link>
                        </li>
                    ))}
                    <br />
                </ul>
            </div>


        </div>

    )
}

export default Mypage;