import React, { useState } from 'react';
import HeaderAuth from '../components/HeaderAuth';
import SidebarLog from '../components/SidebarLog';

function WordCloud(props) {
    const [user_id, set_userId] = useState(props.match.params.userId);
    const [project_id, set_projectId] = useState(props.match.params.projectId);
    const [project_name, set_projectName] = useState(props.match.params.projectName);
    const [meeting_id, set_logId] = useState(props.match.params.meetingId);

    return (
        <div className="content">
            <HeaderAuth />
            <SidebarLog user_id={user_id} project_id={project_id} project_name={project_name} meeting_id={meeting_id} />

            <div>
                <h3>워드 클라우드</h3>
            </div>
        </div>
    )
}

export default WordCloud;