import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar(props) {
    const [user_id, setId] = useState(props.user_id);
    const [project_id, setProjectId] = useState(props.project_id);
    const [project_name, setProjectName] = useState(props.project_name);

    return (
        <div className="sidebar">
            <div className="sidebar-title">{project_name}</div> 
            <ul className="sidebar-menu">
                <li>
                    <Link to={`/${user_id}/project/${project_id}/${project_name}`}>회의LOG 관리</Link>
                </li><br />
                <li>
                    <Link to={`/${user_id}/project/${project_id}/${project_name}/issue`}>ISSUE 관리</Link>
                </li><br />
                <li>
                    <Link to={`/${user_id}/project/${project_id}/${project_name}/member`}>참여자 관리</Link>
                </li>
            </ul>      
        </div>
    );
}

export default Sidebar;