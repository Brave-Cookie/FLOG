import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderAuth from '../components/HeaderAuth';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import Modal from 'react-awesome-modal';

async function getStart(room_code, meeting_name) {
    var res = axios.post('http://localhost:3000/api/auth/createRoom', 
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
    const [meeting_name, set_meetingName] = useState();

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
        axios.get('http://localhost:3000/api/project/log/list/' + project_id)
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
            window.location = `/${user_id}/project/${project_id}/${project_name}/meetingRoom/${room_state}/${meeting_name}`
            set_meetingName("");
            set_modal(false);
        }
        else {
            alert('회의의 이름을 입력해주세요.');
        }
    }

    return(
        <div className="content">
            <HeaderAuth />
            <Sidebar user_id={user_id} project_id={project_id} project_name={project_name}/>
            <br /><br />
            
            <h3>Project{project_id}</h3>
            <button className="meeting-start-button" onClick={openModal}>
                <h3>🙋‍♂️ 방 만들기</h3>
                <p>방장이 되어 회의를 시작해보세요.</p>
            </button>

            <Modal visible={modal} width="300" height="230" effect="fadeInUp">
                <div>
                    <h4>회의 방 만들기</h4>
                    <p>회의의 이름을 입력해주세요.</p>
                    <br />
                    <input type="text" value={meeting_name} onChange={onMeetingNameHandler} />
                    <br /><br />
                    <button className="close" onClick={startMeeting}>회의 시작</button>
                    <button className="close" onClick={closeModal}>창 닫기</button>
                </div>
            </Modal>


            <div className="list-with-sidebar">
                <h3>회의 LOG</h3>
                <hr color="#b9bada" noshade="noshade" size="1"></hr>
                
                <ul className="meeting-list">
                {meetings.map((meeting, id) =>(
                    <li className="meeting-item" key={id}>
                        <Link to={`/${user_id}/project/${project_id}/${project_name}/log/${meeting.meeting_id}`}>
                            {meeting.meeting_date} | [{meeting.meeting_name}] 참여자: [{meeting.user_id.map((user, id) => (
                                <span key={id}>
                                    &nbsp;{user}&nbsp; 
                                </span>
                            ))}]
                            <button className="log-button">감정 회의록</button>
                        </Link>
                    </li>
                ))}
                    <br />
                </ul>
            </div>

            
        </div>
    )
}

export default Project;