import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function SidebarLog(props) {
    const [user_id, setId] = useState(props.user_id);
    const [project_id, setProjectId] = useState(props.project_id);
    const [project_name, setProjectName] = useState(props.project_name);
    const [meeting_id, setMeetingId] = useState(props.meeting_id);
    const [meeting_name, set_meetingName] = useState(props.meeting_name);

    const is_active = {
        color: '#6D42F8',
        fontWeight: 'bolder'
    }
    return (
        <div className="sidebar">
            <div className="sidebar-title">
                <Link to={`/${user_id}/project/${project_id}/${project_name}/log/${meeting_id}/${meeting_name}`}>{meeting_name}</Link>
            </div>
            <ul className="sidebar-menu">
                <li>
                    <NavLink exact activeStyle={is_active} to={`/${user_id}/project/${project_id}/${project_name}/log/${meeting_id}/${meeting_name}`}>회의록 열람</NavLink>
                </li><br />
                <li>
                    <NavLink exact activeStyle={is_active} to={`/${user_id}/project/${project_id}/${project_name}/log/${meeting_id}/${meeting_name}/word-cloud`}>워드 클라우드</NavLink>
                </li><br />
                <li>
                    <NavLink exact activeStyle={is_active} to={`/${user_id}/project/${project_id}/${project_name}/log/${meeting_id}/${meeting_name}/emotion-graph`}>감정 그래프 분석</NavLink>
                </li><br />
                <li>
                    <NavLink exact activeStyle={is_active} to={`/${user_id}/project/${project_id}/${project_name}/log/${meeting_id}/${meeting_name}/rank`}>참여도 랭킹</NavLink>
                </li>
            </ul>      
        </div>
    );
}

export default SidebarLog;