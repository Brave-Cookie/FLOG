import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderAuth from '../components/HeaderAuth';
import Sidebar from '../components/Sidebar';
import axios from 'axios';


function Project(props) {
    
    const [user_id, set_userId] = useState(props.match.params.userId);
    const [project_id, set_projectId] = useState(props.match.params.projectId);
    const [project_name, set_projectName] = useState(props.match.params.projectName);

    const [meetings, set_meetings] = useState([]);
    

    useEffect(() => {
        axios.get('http://localhost:3000/api/project/log/list/' + project_id)
            .then(res => {
                console.log(res);
                let list = res.data.list;
                set_meetings(res.data.list);
            })
    }, []);

    return(
        <div className="content">
            <HeaderAuth />
            <Sidebar user_id={user_id} project_id={project_id} project_name={project_name}/>
            <br /><br />
            
            <h3>Project{project_id}</h3>
            <button className="meeting-start-button">
                <h3>🙋‍♂️ 방 만들기</h3>
                <p>방장이 되어 회의를 시작해보세요.</p>
            </button>


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