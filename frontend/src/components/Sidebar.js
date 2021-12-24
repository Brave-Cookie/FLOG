import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Sidebar(props) {
    const [user_id, setId] = useState(props.user_id);
    const [project_id, setProjectId] = useState(props.project_id);
    const [project_name, setProjectName] = useState(props.project_name);

    const is_active = {
        color: '#6D42F8',
        fontWeight: 'bolder'
    }
    return (
        <div className="sidebar">
            <div className="sidebar-title">
                <Link to={`/${user_id}/project/${project_id}/${project_name}`}>{project_name}</Link>
            </div>
            <ul className="sidebar-menu">
                <li>
                    <NavLink exact activeStyle={is_active} to={`/${user_id}/project/${project_id}/${project_name}`}>회의LOG 관리</NavLink>
                </li><br />
                <li>
                    <NavLink exact activeStyle={is_active} to={`/${user_id}/project/${project_id}/${project_name}/issue`}>ISSUE 관리</NavLink>
                </li><br />
                <li>
                    <NavLink exact activeStyle={is_active} to={`/${user_id}/project/${project_id}/${project_name}/member`}>참여자 관리</NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;