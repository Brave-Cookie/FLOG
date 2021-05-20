import React, { useState } from 'react';
//import { Link, withRouter } from 'react-router-dom';
import HeaderAuth from '../components/HeaderAuth';
import Sidebar from '../components/Sidebar';

function Member(props) {

    const [user_id, set_userId] = useState(props.match.params.userId);
    const [project_id, set_projectId] = useState(props.match.params.projectId);

    return(
        <div className="content">
            <HeaderAuth />
            <Sidebar user_id={user_id} project_id={project_id}/>
            <h3>참여자 관리</h3>
            
        </div>
    )
}

export default Member;