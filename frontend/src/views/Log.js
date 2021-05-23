import axios from 'axios';
import React, { useEffect, useState } from 'react';
import HeaderAuth from '../components/HeaderAuth';
import SidebarLog from '../components/SidebarLog';

function Log(props) {
    const [user_id, set_userId] = useState(props.match.params.userId);
    const [project_id, set_projectId] = useState(props.match.params.projectId);
    const [project_name, set_projectName] = useState(props.match.params.projectName);
    const [log_id, set_logId] = useState(props.match.params.logId);
    const [log_content, set_logContent] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/conf_log/log/fetch/'+log_id)
        .then(res => {
            console.log(res);
            set_logContent(res.data.list);
        })
    })

    const feeling = (event) => {
        let emotion = event.target.value;
        console.log(emotion);
    }
    return (
        <div className="content">
            <HeaderAuth />
            <SidebarLog user_id={user_id} project_id={project_id} project_name={project_name} log_id={log_id} />

            <div>
                <h3>회의록</h3>
                <div>
                {log_content.map((log, id) =>(
                    <li className="log-content" key={id} value={log.log_feeling} style={feeling}>
                            [{log.log_time}] {log.user_id}: {log.log_text}
                    </li>
                ))}
                    <br />
                </div>
            </div>
        </div>
    )
}

export default Log;