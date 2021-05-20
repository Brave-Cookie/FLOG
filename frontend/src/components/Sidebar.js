import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar(props) {
    const [user_id, setId] = useState(""); //useState(props.match.params.userId);
    const [project_id, setProjectId] = useState(""); //useState(props.match.params.projectId);

    return (
        <div className="sidebar">
            <div>{project_id}</div> 
            <hr color="#D8D5EB" noshade="noshade" size="1" />
            <ul className="sidebar-menu">
                <li><Link to={`/${user_id}/project/${project_id}`}>회의LOG 관리</Link></li>
                <li><Link to={`/${user_id}/project/${project_id}/issue`}>ISSUE 관리</Link></li>
                <li><Link to={`/${user_id}/project/${project_id}/member`}>참여자 관리</Link></li>
            </ul>      
        </div>
    );
}

export default Sidebar;