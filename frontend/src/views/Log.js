import axios from 'axios';
import React, { useEffect, useState } from 'react';
import HeaderAuth from '../components/HeaderAuth';
import SidebarLog from '../components/SidebarLog';

function Log(props) {
    const [user_id, set_userId] = useState(props.match.params.userId);
    const [project_id, set_projectId] = useState(props.match.params.projectId);
    const [project_name, set_projectName] = useState(props.match.params.projectName);
    const [meeting_id, set_logId] = useState(props.match.params.meetingId);
    const [log_content, set_logContent] = useState([]);
    const [bg_color, set_color] = useState();
    /*const [log_anger, set_anger] = useState([]);
    const [log_happy, set_happy] = useState([]);
    const [log_neutral, set_neutral] = useState([]);
    const [log_sad, set_sad] = useState([]);
    const [log_fear, set_fear] = useState([]);*/
    let log_anger = [];
    let log_happy = [];
    let log_neutral = [];
    let log_sad = [];
    let log_fear = [];

    useEffect(() => {
        axios.get('http://localhost:3000/api/conf_log/log/fetch/' + meeting_id)
            .then(res => {
                console.log(res);
                console.log(res.data.list);
                set_logContent(res.data.list);
            })
    }, [])


    useEffect(() => {
        for (let i = 0; i < log_content.length; i++) {
            console.log(log_content[i]);
            let row = {
                user_id: log_content[i].user_id,
                log_feeling: log_content[i].log_feeling,
            };
            //let row = log_content[i].values();
            console.log(row);
            if (log_content[i].log_feeling === "anger") {
                log_anger.push(row);
                console.log("::anger::" + log_anger);
            }
            else if (log_content[i].log_feeling === "happy") {
                log_happy.push(log_content[i]);
            }
            else if (log_content[i].log_feeling === "neutral") {
                log_neutral.push(log_content[i]);
            }
            else if (log_content[i].log_feeling === "sad") {
                log_sad.push(log_content[i]);
            }
            else {
                log_fear.push(log_content[i]);
            }
        }
        //const anger = log_content.filter(log_feeling => log_feeling == "anger");
        //console.log(anger);

        // Objects.key 또는 value


    })

    console.log(log_anger);


    const getLogContent = () => {
        let rst = log_content.map((log, id) => {
            if (log.log_feeling === "anger") {
                return (<p style={{ backgroundColor: '#FFB7DD' }} > [{log.log_time}] {log.user_id}: {log.log_text} </p>)
            }
            else return (<p style={{ backgroundColor: 'white' }} > [{log.log_time}] {log.user_id}: {log.log_text} </p>)
        });
    }

    return (
        <div className="content">
            <HeaderAuth />
            <SidebarLog user_id={user_id} project_id={project_id} project_name={project_name} meeting_id={meeting_id} />
            <br /><br />
            <div className="entire-log-title">
                <h3>회의록 전문<button className="listen-button">음성으로 회의 듣기</button></h3>
            </div>
            <div className="log-with-buttons">
            <ul className="emotion-button">
                    <li><button className="all-button">전체</button></li>
                    <li><button className="happy-button">기쁨</button></li>
                    <li><button className="anger-button">격양</button></li>
                    <li><button className="sad-button">슬픔</button></li>
                    <li><button className="fear-button">긴장</button></li>
                    <li><button className="neutral-button">평범</button></li>
                </ul>
            </div>
            <div className="log-box">
                <div className="log-scroll"><br />
                    {log_content.map((log, id) => (
                        <div>
                            <li className="log-content" key={id} id={log.log_feeling}>
                                {(function () {
                                    if (log.log_feeling === "anger") {
                                        return (<p style={{ backgroundColor: "#FFB7DD" }}>[{log.log_time}] {log.user_id}: {log.log_text}</p>);
                                    }
                                    else if (log.log_feeling === "happy") {
                                        return (<p style={{ backgroundColor: "#FFFF85" }}>[{log.log_time}] {log.user_id}: {log.log_text}</p>);
                                    }
                                    else if (log.log_feeling === "neutral") {
                                        return (<p style={{ backgroundColor: "#E3E0EC" }}>[{log.log_time}] {log.user_id}: {log.log_text}</p>);
                                    }
                                    else if (log.log_feeling === "sad") {
                                        return (<p style={{ backgroundColor: "#95BEEF" }}>[{log.log_time}] {log.user_id}: {log.log_text}</p>);
                                    }
                                    else if (log.log_feeling === "fear") {
                                        return (<p style={{ backgroundColor: "#B3EBD8" }}>[{log.log_time}] {log.user_id}: {log.log_text}</p>);
                                    }
                                })()}
                            </li>

                        </div>
                    ))}
                    <br />
                </div>

            </div>

            <div>
                <p>테스트</p>
                {log_anger.map((log, id) => (
                    <li key={id}>{log.text}</li>
                ))}
            </div>


        </div>
    )
}

export default Log;