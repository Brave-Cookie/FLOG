import React, { useState } from 'react';
import HeaderAuth from '../components/HeaderAuth';
import SidebarLog from '../components/SidebarLog';
import axios from 'axios'
import origin from "../api/origin";

function Rank(props) {
    const [user_id, set_userId] = useState(props.match.params.userId);
    const [project_id, set_projectId] = useState(props.match.params.projectId);
    const [project_name, set_projectName] = useState(props.match.params.projectName);
    const [meeting_id, set_logId] = useState(props.match.params.meetingId);
    const [meeting_name, set_meetingName] = useState(props.match.params.meetingName);

    const [first_rank, set_firstRank] = useState("");
    const [second_rank, set_secondRank] = useState("");
    const [third_rank, set_thirdRank] = useState("");

    const [user_anger, set_userAnger] = useState("");
    const [user_happy, set_userHappy] = useState("");
    const [user_sad, set_userSad] = useState("");
    const [user_fear, set_userFear] = useState("");
    const [count_anger, set_countAnger] = useState("0");
    const [count_happy, set_countHappy] = useState("0");
    const [count_sad, set_countSad] = useState("0");
    const [count_fear, set_countFear] = useState("0");

    useState(() => {
        let feeling = "anger";
        axios.get(`${origin.express}/meetingLog/log/rank/${meeting_id}/${feeling}`)
            .then((res) => {
                // 참여도 순위
                let total_rank = res.data.total_rank;
                for(let i=0; i < total_rank.length; i++ ){
                    if(i == 0){ set_firstRank(total_rank[i]); }
                    else if(i == 1){ set_secondRank(total_rank[i]); }
                    else if(i == 2){ set_thirdRank(total_rank[i]); }
                }
                // anger 감정 대표자 저장
                if(res.status === 200){
                    set_userAnger(res.data.firstrank);
                    set_countAnger(res.data.count);
                }
                else{
                    set_userAnger('없음');
                    set_countAnger(0);
                }
                
            })
    }, [])
    useState(() => {
        let feeling = "happiness";
        axios.get(`${origin.express}/meetingLog/log/rank/${meeting_id}/${feeling}`)
            .then((res) => {
                if(res.status === 200){
                    set_userHappy(res.data.firstrank);
                    set_countHappy(res.data.count);
                }
                else{
                    set_userHappy('없음');
                    set_countHappy(0);
                }
            })
    }, [])
    useState(() => {
        let feeling = "sadness";
        axios.get(`${origin.express}/meetingLog/log/rank/${meeting_id}/${feeling}`)
            .then((res) => {
                if(res.status === 200){
                    set_userSad(res.data.firstrank);
                    set_countSad(res.data.count);
                }
                else{
                    set_userSad('없음');
                    set_countSad(0);
                }
            })
    }, [])
    useState(() => {
        let feeling = "fear";
        axios.get(`${origin.express}/meetingLog/log/rank/${meeting_id}/${feeling}`)
            .then((res) => {
                if(res.status === 200){
                    set_userFear(res.data.firstrank);
                    set_countFear(res.data.count);
                }
                else{
                    set_userFear('없음');
                    set_countFear(0);
                }
            })
    }, [])

    return (
        <div className="content">
            <HeaderAuth />
            <SidebarLog user_id={user_id} project_id={project_id} project_name={project_name} meeting_id={meeting_id} meeting_name={meeting_name}/>
            <br /><br />
            <div className="rank-title">
                <h3 style={{ fontSize: '20px' }}>🏆 참여도 랭킹</h3>
                <p style={{ fontSize: '16px', lineHeight: '24px' }}>가장 참여도가 높은 팀원은 누구일까요?<br />
                    참여도는 발언 시간과 발언 횟수, 워드 클라우드와의 단어 유사도 등을 종합해 산출합니다.
                </p>
            </div>
            <div className="rank-box">
                <div className="ranking">
                    <div className="first">
                        <div className='rank_emoticon'>🥇</div>
                        <div>{first_rank}</div>
                    </div>
                    <div className="second">
                        <div className='rank_emoticon'>🥈</div>
                        <div>{second_rank}</div>
                    </div>
                    <div className="third">
                        <div className='rank_emoticon'>🥉</div>
                        <div>{third_rank}</div>
                    </div>
                </div>
            </div>

            <div className="state-title">
                <h3 style={{ fontSize: '20px' }}>감정 대표자 소개</h3>
                <div className="state-sub-title" style={{fontSize: "16px"}}>각 감정 별로 가장 많은 발언을 한 사람이 뽑힙니다.</div> 
                <hr color="#EEEFFC" noshade="noshade" size="2"></hr>
            </div>
            <div className="state-box">
                <div className="state">
                    <div className="left-state">
                        <p>😃 파워 긍정러 {user_happy}</p><p style={{fontSize: "16px", fontFamily: 'NEXON Lv2 Gothic Light'}}>
                            '<span style={{ color: "#6D42F8", fontWeight: "bold" }}>기쁨</span>' 감정으로 <span style={{ color: "#6D42F8", fontWeight: "bold" }}>{count_happy}번</span> 발언했어요! 당신은 우리의 비타민~ 
                        </p>
                        <br />
                        <p>😥 눈물 뚝뚝 {user_sad}</p><p style={{fontSize: "16px", fontFamily: 'NEXON Lv2 Gothic Light'}}>
                            '<span style={{ color: "#6D42F8", fontWeight: "bold" }}>슬픔</span>' 감정으로 <span style={{ color: "#6D42F8", fontWeight: "bold" }}>{count_sad}번</span> 발언했어요! 울지말아요, 당신.
                        </p>
                    </div>
                    <div className="right-state">
                        <p>😡 흥분 과다 {user_anger}</p><p style={{fontSize: "16px", fontFamily: 'NEXON Lv2 Gothic Light'}}>
                            '<span style={{ color: "#6D42F8", fontWeight: "bold" }}>격양</span>' 감정으로 <span style={{ color: "#6D42F8", fontWeight: "bold" }}>{count_anger}번</span> 발언했어요! 워~ 워~ 진정하세요.
                        </p>
                        <br />
                        <p>😨 프로 긴장러 {user_fear}</p><p style={{fontSize: "16px", fontFamily: 'NEXON Lv2 Gothic Light'}}>
                            '<span style={{ color: "#6D42F8", fontWeight: "bold" }}>긴장</span>' 감정으로 <span style={{ color: "#6D42F8", fontWeight: "bold" }}>{count_fear}번</span> 발언했어요! 떨리는 마음, 심호흡 한 번!
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Rank;