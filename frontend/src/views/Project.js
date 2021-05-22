import React, { useState } from 'react';
//import { Link, withRouter } from 'react-router-dom';
import HeaderAuth from '../components/HeaderAuth';
import Sidebar from '../components/Sidebar';


function Project(props) {
    
    const [user_id, set_userId] = useState(props.match.params.userId);
    const [project_id, set_projectId] = useState(props.match.params.projectId);
    const [project_name, set_projectName] = useState(props.match.params.projectName);

    return(
        <div className="content">
            <HeaderAuth />
            <Sidebar user_id={user_id} project_id={project_id} project_name={project_name}/>
            <br /><br />
            
            <h3>Project{project_id}</h3>
            <button className="meeting-start-button">
                <h3>방 만들기</h3>
                <p>방장이 되어 회의를 시작해보세요.</p>
            </button>

            
        </div>
    )
}

export default Project;