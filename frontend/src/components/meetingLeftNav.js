import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Sidebar(props) {
    const [user_id, setId] = useState(props.user_id);
    const [project_id, setProjectId] = useState(props.project_id);
    const [project_name, setProjectName] = useState(props.project_name);

    return (
        <div className="navbar">
           <ul className="menu-wrap">
                <li>🌐 공유</li>
                <li>▶ 시작</li>
                <li>끝내기</li>
           </ul>
        </div>
    );
}

export default Sidebar;