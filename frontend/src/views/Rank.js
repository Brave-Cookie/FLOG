import React, { useState } from 'react';
import HeaderAuth from '../components/HeaderAuth';
import SidebarLog from '../components/SidebarLog';

function Rank(props) {
    const [user_id, set_userId] = useState(props.match.params.userId);
    const [project_id, set_projectId] = useState(props.match.params.projectId);
    const [project_name, set_projectName] = useState(props.match.params.projectName);
    const [meeting_id, set_logId] = useState(props.match.params.meetingId);

    const [user_rank, set_userRank] = useState([]);
    const [user_state, set_userState] = useState([]);

    const [user_anger, set_userAnger] = useState("김필록");
    const [user_happy, set_userHappy] = useState("강전호");
    const [user_sad, set_userSad] = useState("김수지");
    const [user_neutral, set_userNeutral] = useState("박에이");
    const [user_fear, set_userFear] = useState("한재원");


    return (
        <div className="content">
            <HeaderAuth />
            <SidebarLog user_id={user_id} project_id={project_id} project_name={project_name} meeting_id={meeting_id} />
            <br /><br />
            <div className="rank-title">
                <h3>🏆 참여도 랭킹</h3>
            </div>
            <div className="rank-box">
                <div className="ranking">
                    
                </div>
            </div>

            <div className="state-title">
                <h3>감정 대표자 소개</h3>
                <p style={{fontSize: "14px"}}>각 감정 별로 가장 많은 발언을 한 사람이 뽑힙니다.</p>
            </div>
            <div className="state-box">
                <div className="state">
                    <p style={{fontWeight:"bold"}}>😃 파워 긍정러 {user_happy}</p> <p style={{fontWeight:"bold"}}>😥 눈물 뚝뚝 {user_sad}</p>
                    <p style={{fontWeight:"bold"}}>😨 프로 긴장러 {user_fear}</p> <p style={{fontWeight:"bold"}}>😡 흥분 과다 {user_anger}</p>
                    <p style={{fontWeight:"bold"}}>🙂 평온한 {user_neutral}</p>
                </div>
            </div>

        </div>
    )
}

export default Rank;