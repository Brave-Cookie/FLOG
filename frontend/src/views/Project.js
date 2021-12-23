import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderAuth from '../components/HeaderAuth';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import Modal from 'react-awesome-modal';
import meetingIcon from '../assets/image/createRoom.png';
import origin from "../api/origin";

async function getStart(room_code, meeting_name) {
    var res = axios.post(`${origin.express}/auth/createRoom`, 
        { room_code, meeting_name });
    console.log(res);

    return res;
}

function Project(props) {
    
    const [user_id, set_userId] = useState(props.match.params.userId);
    const [project_id, set_projectId] = useState(props.match.params.projectId);
    const [project_name, set_projectName] = useState(props.match.params.projectName);

    const [meetings, set_meetings] = useState([]);
    const [modal, set_modal] = useState(false);
    const [meeting_name, set_meetingName] = useState("");

    const onModalHandler = (event) => {
        set_modal(event.currentTarget.value);
    }
    const onMeetingNameHandler = (event) => {
        set_meetingName(event.currentTarget.value);
    }
    const openModal = () => {
        set_modal(true);
    }
    const closeModal = () => {
        set_modal(false);
    }

    useEffect(() => {
        axios.get(`${origin.express}/project/log/list/${project_id}`)
            .then(res => {
                console.log(res);
                //let list = res.data.list;
                set_meetings(res.data.list);
            })
    }, []);

    const startMeeting = () => {
        if (meeting_name !== "") {
            const room_code = (Math.random() * new Date().getTime()).toString(32).toUpperCase().replace(/\./g, '-');
            const res = getStart(room_code, meeting_name);
            const room_state = 'open';
            props.history.push(`/${user_id}/project/${project_id}/${project_name}/meetingRoom/${room_state}/${meeting_name}/${room_code}`)
            set_meetingName("");
            set_modal(false);
        }
        else {
            alert('회의의 이름을 입력해주세요.');
        }
    }

    const icon = {
        width: '90px',
    }
    const project_input = {
        fontSize: '17px',
        padding: '5px',
    }

    return(
        <div className="content">
            <HeaderAuth />
            <Sidebar user_id={user_id} project_id={project_id} project_name={project_name}/>
            <br /><br />
            
            
            <button className="meeting-start-button" onClick={openModal}>
                <h2>방 만들기</h2>
                <img src={meetingIcon} style={icon}></img>
                <p>방장이 되어<br />회의를 시작해보세요.</p>
            </button>

            <Modal visible={modal} width="350" height="260" effect="fadeInUp">
                <div>
                    <h2>회의 방 만들기</h2>
                    <p style={{ fontSize: "18px" }} >회의의 이름을 입력해주세요.</p>
                    <br />
                    <input type="text" value={meeting_name} onChange={onMeetingNameHandler} style={project_input}/>
                    <br /><br /><br />
                    <button className="close-button" onClick={startMeeting}>회의 시작</button>
                    <button className="close-button" onClick={closeModal}>창 닫기</button>
                </div>
            </Modal>

            <br /><br />
            <div className="list-with-sidebar">
                <h3 style={{ fontSize: "22px" }}>회의 LOG</h3>
                <hr color="#b9bada" noshade="noshade" size="1"></hr>
                {(function () {
                    if (meetings.length === 0) {
                        return (<p style={{ color: "#b9bada",  fontSize: "17px", lineHeight: "24px" }}>방 만들기를 통해 회의를 시작해보세요!</p>);
                    }
                    else {
                        return (
                            <ul className="meeting-list">
                            {meetings.map((meeting, id) =>(
                                <li className="meeting-item" key={id}>
                                    <Link to={`/${user_id}/project/${project_id}/${project_name}/log/${meeting.meeting_id}/${meeting.meeting_name}`}>
                                        <span style={{ fontWeight: 'bold' }}>{meeting.meeting_date}&nbsp;</span>
                                            | 제목: [ <span style={{ fontWeight: 'bold' }}>{meeting.meeting_name}</span> ] 
                                            참여자: [<span style={{ fontWeight: 'bold' }}>{meeting.user_id.map((user, id) => (
                                            <span key={id}>
                                                &nbsp;{user}&nbsp; 
                                            </span>
                                        ))}</span>]
                                        <button className="log-button">감정 회의록</button>
                                    </Link>
                                </li>
                            ))}
                                <br />
                            </ul>
                        )
                    }
                })()}
            </div>

            
        </div>
    )
}

export default Project;