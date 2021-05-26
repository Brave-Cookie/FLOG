import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function SidebarLog(props) {
    const [user_id, setId] = useState(props.user_id);
    const [project_id, setProjectId] = useState(props.project_id);
    const [project_name, setProjectName] = useState(props.project_name);
    const [meeting_id, setMeetingId] = useState(props.meeting_id);

    const is_active = {
        color: '#6D42F8',
        fontWeight: 'bolder'
    }
    return (
        <div className="sidebar">
            <div className="sidebar-title">
                <Link to={`/${user_id}/project/${project_id}/${project_name}`}>{project_name}-{meeting_id}</Link>
            </div>
            <ul className="sidebar-menu">
                <li>
                    <NavLink exact activeStyle={is_active} to={`/${user_id}/project/${project_id}/${project_name}/log/${meeting_id}`}>회의록 열람</NavLink>
                </li><br />
                <li>
                    <NavLink exact activeStyle={is_active} to={`/${user_id}/project/${project_id}/${project_name}/log/${meeting_id}/word-cloud`}>워드 클라우드</NavLink>
                </li><br />
                <li>
                    <NavLink exact activeStyle={is_active} to={`/${user_id}/project/${project_id}/${project_name}/log/${meeting_id}/emotion-graph`}>감정 그래프 분석</NavLink>
                </li><br />
                <li>
                    <NavLink exact activeStyle={is_active} to={`/${user_id}/project/${project_id}/${project_name}/log/${meeting_id}/rank`}>참여도 랭킹</NavLink>
                </li>
            </ul>      
        </div>
    );
}

export default SidebarLog;