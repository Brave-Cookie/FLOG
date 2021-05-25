import React, { useState } from 'react';
import HeaderAuth from '../components/HeaderAuth';
import SidebarLog from '../components/SidebarLog';

function EmotionGraph(props) {
    const [user_id, set_userId] = useState(props.match.params.userId);
    const [project_id, set_projectId] = useState(props.match.params.projectId);
    const [project_name, set_projectName] = useState(props.match.params.projectName);
    const [meeting_id, set_logId] = useState(props.match.params.meetingId);

    const [avg_feeling, set_avgFeeling] = useState([]);
    const [pi_feeling, set_piFeeling] = useState([]);

    const [top_feeling, set_topFeeling] = useState("적극적인");
    /*
    파이 차트 그릴 데이터에서 가장 큰 값을 top_feeling으로 useEffect로 지정
    */
    return (
        <div className="content">
            <HeaderAuth />
            <SidebarLog user_id={user_id} project_id={project_id} project_name={project_name} meeting_id={meeting_id} />
            <br /><br />
            <div className="graph-title">
                <h3>평균 감정 그래프</h3>
            </div>
            <div className="graph-box">
                <div className="emotion-graph">
                    
                </div>
                <p className="graph-sub-title">시간에 따른 회의 전체의 감정 변화를 보여줍니다.</p>
            </div>

            <div className="pi-chart-title">
                <h3>전체 감정 분석</h3>
            </div>

            <div className="chart-box">
                    
                <p className="chart-sub-title">회의는 전반적으로 {top_feeling} 분위기였네요!</p>
            </div>
            
        </div>
    )
}

export default EmotionGraph;