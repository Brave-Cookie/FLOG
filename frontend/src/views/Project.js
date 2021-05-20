import React, { useState } from 'react';
//import { Link, withRouter } from 'react-router-dom';
import HeaderAuth from '../components/HeaderAuth';
import Sidebar from '../components/Sidebar';

function Project(props) {
    
    const [project_id, set_projectId] = useState(props.match.params.projectId);

    return(
        <div className="content">
            <HeaderAuth />
            <Sidebar />
            <h3>Project{project_id}</h3>
            
        </div>
    )
}

export default Project;