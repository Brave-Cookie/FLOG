import React, { useEffect, useState } from 'react';
import HeaderAuth from '../components/HeaderAuth';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { createProject } from '../api/axios.js'
import axios from 'axios'
import Modal from 'react-awesome-modal';
import projectIcon from '../assets/image/createProject.png';
import joinIcon from '../assets/image/joinRoom.png';

async function register(user_id, project_name) {
    var res = await createProject(user_id, project_name);
    return res;
}

async function get_projcet_list(user_id) {
    return axios.get('http://localhost:3000/api/project/list/' + user_id);
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
        get_projcet_list(user_id).then(
            res => {
                console.log('프로젝트 리스트 받아옴 : ', res)
                set_projects(res.data.list); 
            }
        )
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


    const registProject = async () => {
        if (project_name !== "") {
            // 프젝 삽입요청
            const res = await register(user_id, project_name);
            // 프젝 리스트 다시 다 받고 마지막 추가된 것만 useState 배열에 추가
            if(res.status === 200){
                alert('🎉 프로젝트가 생성되었습니다.');
                get_projcet_list(user_id).then(
                    res => {
                        let new_list = res.data.list
                        set_projects([...projects, new_list[new_list.length - 1]])
                    }
                )
                set_project("");
                set_projectModal(false);
            }
        }
        else {
            alert('⚠ 프로젝트명을 입력해주세요. ⚠')
        }
    }


    const enterMeeting = () => {
        if (meeting_code !== "") {
            let res = axios.get('http://localhost:3000/api/auth/check/' + meeting_code)
                .then((res) => {
                    if (res.status === 200) {
                        let meeting_name = res.data.meeting_name;
                        let room_state = 'join';
                        props.history.push(`/mypage/${user_id}/meetingRoom/${room_state}/${meeting_name}/${meeting_code}`)
                    }
                    else {
                        alert('🚫 존재하지 않는 회의입니다. 🚫')
                    }
                })

            set_code("");
            set_codeModal(false);
        }
        else {
            alert('⚠ 코드를 입력해주세요. ⚠');
        }
    }

    const icon = {
        width: '70px',
    }

    const modal_input = {
        fontSize: '17px',
        padding: '5px',
    }

    return (
        <div className="content">
            <HeaderAuth />
            <br /><br /><br />
            <h3>'<Link to={`/mypage/${user_id}`}>{user}</Link>'님 환영합니다 :)</h3>
            <div className="mypage-buttons">
                <button onClick={openProjectModal} className="create-project-button">
                    <h3 className="create-project-title">프로젝트 생성</h3>
                    <img src={projectIcon} style={icon}></img>
                    <p>프로젝트 폴더를 만들어<br />회의를 관리해보세요.</p>
                </button>

                <button onClick={openCodeModal} className="join-meeting-button">
                    <h3 className="join-meeting-title">회의 참여하기</h3>
                    <img src={joinIcon} style={icon}></img>
                    <p>코드를 입력하면<br />회의에 참여할 수 있어요.</p>
                </button>
            </div>
            <Modal visible={projectModal} width="350" height="220" effect="fadeInUp">
                <div>
                    <br />
                    <h3>프로젝트의 이름을 입력해주세요.</h3>
                    <br />
                    <input type="text" value={project_name} onChange={onProjectHandler} style={modal_input} />
                    <br /><br /><br />
                    <button className="close-button" onClick={registProject}>생성하기</button>
                    <button className="close-button" onClick={closeModal}>창 닫기</button>
                </div>
            </Modal>

            <Modal visible={codeModal} width="350" height="220" effect="fadeInUp">
                <div>
                <br />
                    <h3>회의 코드를 입력해주세요.</h3>
                    <br />
                    <input type="text" value={meeting_code} onChange={onCodeHandler} style={modal_input} />
                    <br /><br /><br />
                    <button className="close-button" onClick={enterMeeting}>입장하기</button>
                    <button className="close-button" onClick={closeModal}>창 닫기</button>
                </div>
            </Modal>

            <div className="list">
                <h3 style={{ fontSize: "21px" }}>나의 프로젝트</h3>
                <hr color="#b9bada" noshade="noshade" size="1"></hr>
                {(function () {
                    if (projects.length === 0) {
                        return (<p style={{ color: "#b9bada",  fontSize: "17px", lineHeight: "24px" }}>아직 만들어진 프로젝트가 없네요! 첫 프로젝트를 만들어볼까요?</p>);
                    }
                    else {
                        return (
                        <ul className="project-list">
                            {projects.map((project, id) => (
                                <li className="project-item" key={id}>
                                    <Link to={`/${user_id}/project/${project.project_id}/${project.project_name}`}>
                                        <span style={{ fontWeight: 'bold' }}>{project.project_name}</span> &nbsp;|&nbsp; 참여자 수: [ <span style={{ fontWeight: 'bold' }}>{project.count} 명</span> ] 
                                        &nbsp;&nbsp;최근 회의 날짜: [ {(function () {
                                            if(project.date === "null"){
                                                return(<span style={{ color: "#b9bada" }}>아직 개설된 회의가 없어요.</span>);
                                            }
                                            else return(<span style={{ fontWeight: 'bold' }}>{project.date}</span>)
                                        })()} ]
                                    </Link>
                                </li>
                            ))}
                            <br />
                        </ul>)
                    }
                })()}

            </div>


        </div>

    )
}

export default Mypage;