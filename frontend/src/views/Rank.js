import React, { useState } from 'react';
import HeaderAuth from '../components/HeaderAuth';
import SidebarLog from '../components/SidebarLog';

function Rank(props) {
    const [user_id, set_userId] = useState(props.match.params.userId);
    const [project_id, set_projectId] = useState(props.match.params.projectId);
    const [project_name, set_projectName] = useState(props.match.params.projectName);
    const [meeting_id, set_logId] = useState(props.match.params.meetingId);

    const [user_rank, set_userRank] = useState(["김필록", "박에이", "테스트"]);
    const [user_state, set_userState] = useState([]);
    // 이 두개는 서버에서 받아온 값 리스트로 저장하고
    // 감정 통계의 경우는 filter로 하나씩 값 넣으면 될 듯

    const [user_anger, set_userAnger] = useState("김필록");
    const [user_happy, set_userHappy] = useState("강전호");
    const [user_sad, set_userSad] = useState("김수지");
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
                <div className="state-sub-title" style={{fontSize: "14px"}}>: 각 감정 별로 가장 많은 발언을 한 사람이 뽑힙니다.</div> 
                <hr color="#EEEFFC" noshade="noshade" size="2"></hr>
            </div>
            <div className="state-box">
                <div className="state">
                    <div className="left-state">
                        <p>😃 파워 긍정러 {user_happy}</p>
                        <p>😨 프로 긴장러 {user_fear}</p>
                    </div>
                    <div className="right-state">
                        <p>😥 눈물 뚝뚝 {user_sad}</p>
                        <p>😡 흥분 과다 {user_anger}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Rank;