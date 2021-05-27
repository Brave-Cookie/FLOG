import React, { useState } from 'react';
import HeaderAuth from '../components/HeaderAuth';
import SidebarLog from '../components/SidebarLog';
import axios from 'axios'

function Rank(props) {
    const [user_id, set_userId] = useState(props.match.params.userId);
    const [project_id, set_projectId] = useState(props.match.params.projectId);
    const [project_name, set_projectName] = useState(props.match.params.projectName);
    const [meeting_id, set_logId] = useState(props.match.params.meetingId);

    const [user_rank, set_userRank] = useState(["김필록", "박에이", "테스트"]);
    // 이 두개는 서버에서 받아온 값 리스트로 저장하고

    const [user_anger, set_userAnger] = useState();
    const [user_happy, set_userHappy] = useState();
    const [user_sad, set_userSad] = useState();
    const [user_fear, set_userFear] = useState();
    useState(() => {
        let feeling = "anger";
        axios.get('http://localhost:3000/api/meetingLog/log/rank/' + meeting_id + '/' + feeling)
            .then((res) => {
                console.log(res.data.firstrank);
                set_userAnger(res.data.firstrank);
            })
    }, [])
    useState(() => {
        let feeling = "happiness";
        axios.get('http://localhost:3000/api/meetingLog/log/rank/' + meeting_id + '/' + feeling)
            .then((res) => {
                set_userHappy(res.data.firstrank);
            })
    }, [])
    useState(() => {
        let feeling = "sadness";
        axios.get('http://localhost:3000/api/meetingLog/log/rank/' + meeting_id + '/' + feeling)
            .then((res) => {
                set_userSad(res.data.firstrank);
            })
    }, [])
    useState(() => {
        let feeling = "fear";
        axios.get('http://localhost:3000/api/meetingLog/log/rank/' + meeting_id + '/' + feeling)
            .then((res) => {
                set_userFear(res.data.firstrank);
            })
    }, [])

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
                    <div className="first">🥇 김필록</div>
                    <div className="second">🥈 김수지</div>
                    <div className="third">🥉 박에이</div>
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
                        <p>😥 눈물 뚝뚝 {user_sad}</p>
                    </div>
                    <div className="right-state">
                        <p>😡 흥분 과다 {user_anger}</p>
                        <p>😨 프로 긴장러 {user_fear}</p> 
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Rank;