import axios from 'axios';
import React, { useEffect, useState } from 'react';
import HeaderAuth from '../components/HeaderAuth';
import SidebarLog from '../components/SidebarLog';

function Log(props) {
    const [user_id, set_userId] = useState(props.match.params.userId);
    const [project_id, set_projectId] = useState(props.match.params.projectId);
    const [project_name, set_projectName] = useState(props.match.params.projectName);
    const [meeting_id, set_logId] = useState(props.match.params.meetingId);
    const [meeting_name, set_meetingName] = useState(props.match.params.meetingName);
    console.log(meeting_name);
    const [log_content, set_logContent] = useState([]);

    const [log_anger, set_anger] = useState([]);
    const [log_happy, set_happy] = useState([]);
    const [log_neutral, set_neutral] = useState([]);
    const [log_sad, set_sad] = useState([]);
    const [log_fear, set_fear] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:3000/api/meetingLog/log/fetch/' + meeting_id)
            .then(res => {
                console.log(res);
                set_logContent(res.data.list);
                set_showLog(res.data.list);
                //console.log(show_log);
            })
    }, [])

    const [show_log, set_showLog] = useState(log_content);
    console.log(show_log);
    useEffect(() => {
        /*console.log("in useEffect: " + log_content)
        let res = log_content.filter((it, id) => it.log_feeling === "anger");
        console.log(res);
        //log_anger=res;
        set_anger(res);
        console.log(log_anger);*/
        let feeling = "anger";
        axios.get('https://localhost:3000/api/meetingLog/log/fetch/' + meeting_id + '/' + feeling)
            .then(res => {
                console.log(res);
                set_anger(res.data.list);
            })

        // onclick이면 어케 할지. 화면 전환? 컴포넌트 전환? 컴포넌트 전환이 맞는거 같은데
    }, [])
    useEffect(() => {
        let feeling = "happiness";
        axios.get('https://localhost:3000/api/meetingLog/log/fetch/' + meeting_id + '/' + feeling)
            .then(res => {
                console.log(res);
                set_happy(res.data.list);
            })
    }, [])
    useEffect(() => {
        let feeling = "neutral";
        axios.get('https://localhost:3000/api/meetingLog/log/fetch/' + meeting_id + '/' + feeling)
            .then(res => {
                console.log(res);
                set_neutral(res.data.list);
            })
    }, [])
    useEffect(() => {
        let feeling = "sadness";
        axios.get('https://localhost:3000/api/meetingLog/log/fetch/' + meeting_id + '/' + feeling)
            .then(res => {
                console.log(res);
                set_sad(res.data.list);
            })
    }, [])
    useEffect(() => {
        let feeling = "fear";
        axios.get('https://localhost:3000/api/meetingLog/log/fetch/' + meeting_id + '/' + feeling)
            .then(res => {
                console.log(res);
                set_fear(res.data.list);
            })
    }, [])

    console.log(show_log);
    const filter_all = () => {
        set_showLog(log_content);
    }
    const filter_anger = () => {
        set_showLog(log_anger);
    }
    const filter_happiness = () => {
        set_showLog(log_happy);
    }
    const filter_neutral = () => {
        set_showLog(log_neutral);
    }
    const filter_sadness = () => {
        set_showLog(log_sad);
    }
    const filter_fear = () => {
        set_showLog(log_fear);
    }

    return (
        <div className="content">
            <HeaderAuth />
            <SidebarLog user_id={user_id} project_id={project_id} project_name={project_name} meeting_id={meeting_id} meeting_name={meeting_name}/>
            <br /><br />
            <div className="entire-log-title">
                <h3 style={{ fontSize: '20px' }}>📝 회의록 전문<button className="listen-button">음성으로 회의 듣기</button></h3>
                <p style={{ fontSize: '16px' }}>실시간 회의의 내용이 자동으로 텍스트화 됩니다. 우측 버튼을 통해 감정 별로 필터링 해보세요!</p>
            </div>
            <div className="log-with-buttons">
            <ul className="emotion-button">
                    <li><button className="all-button" onClick={filter_all}>전체</button></li>
                    <li><button className="happy-button" onClick={filter_happiness}>기쁨</button></li>
                    <li><button className="anger-button" onClick={filter_anger}>격양</button></li>
                    <li><button className="sad-button" onClick={filter_sadness}>슬픔</button></li>
                    <li><button className="fear-button" onClick={filter_fear}>긴장</button></li>
                    <li><button className="neutral-button" onClick={filter_neutral}>평범</button></li>
                </ul>
            </div>
            <div className="log-box">
                <div className="log-scroll"><br />

                    {show_log.map((log, id) => (
                        <div>
                            <li className="log-content" key={id}>
                                {(function () {
                                    if (log.log_feeling === "anger") {
                                        return (<p style={{ backgroundColor: "#FFB7DD" }}>[{log.log_time}] {log.user_id}: {log.log_text}</p>);
                                    }
                                    else if (log.log_feeling === "happiness") {
                                        return (<p style={{ backgroundColor: "#FFFF85" }}>[{log.log_time}] {log.user_id}: {log.log_text}</p>);
                                    }
                                    else if (log.log_feeling === "neutral") {
                                        return (<p style={{ backgroundColor: "#E3E0EC" }}>[{log.log_time}] {log.user_id}: {log.log_text}</p>);
                                    }
                                    else if (log.log_feeling === "sadness") {
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
            

        </div>
    )
}

export default Log;