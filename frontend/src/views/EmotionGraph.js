import React, { useState } from 'react';
import HeaderAuth from '../components/HeaderAuth';
import SidebarLog from '../components/SidebarLog';
//import { Chart, registerables } from 'chart.js';
import { PieChart } from 'react-minimal-pie-chart';



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

    /*const data = {
        labels: [
          '기쁨',
          '격양',
          '슬픔',
          '긴장',
          '평범'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [30, 10, 5, 17, 20],
          backgroundColor: [
            'rgb(255, 255, 133)',
            'rgb(255, 183, 221)',
            'rgb149, 190, 239)',
            'rgb(179, 235, 216)',
            'rgb(227, 224, 236)',
          ],
          hoverOffset: 4
        }]
      };
      // <block:config:0>
    const config = {
        type: 'pie',
        data: data,
    };
    // </block:config>
  
    module.exports = {
        actions: [],
        config: config,
    };*/
    const [happy_count, set_happyCount] = useState(Math.round(30/70*100));
    // 일케 계산해서 쓰는 수밖에 없을듯..?

    const data = [
        { title: '기쁨', value: 30, color: '#FFFF85' },
        { title: '격양', value: 10, color: '#FFB7DD' },
        { title: '평범', value: 17, color: '#E3E0EC' },
        { title: '슬픔', value: 5, color: '#95BEEF' },
        { title: '긴장', value: 8, color: '#B3EBD8' },
    ]

    return (
        <div className="content">
            <HeaderAuth />
            <SidebarLog user_id={user_id} project_id={project_id} project_name={project_name} meeting_id={meeting_id} />
            <br /><br />
            <div className="graph-title">
                <h3>평균 감정 그래프</h3>
                <p className="graph-sub-title">: 시간에 따른 회의 전체의 감정 변화를 보여줍니다.</p>
            </div>
            <div className="graph-box">
                <div className="emotion-graph">
                    
                </div>
            </div>

            <div className="pi-chart-title">
                <h3>전체 감정 분석</h3>
                <hr color="#EEEFFC" noshade="noshade" size="2"></hr>
            </div>

            <div className="chart-box">
                <PieChart data={data} />
            </div>
            <ul className="chart-index">
                <li><div className="index" style={{color:"#FFFF85"}}>■&nbsp;</div> 기쁨 - {happy_count}%</li>
                <li><div className="index" style={{color:"#FFB7DD"}}>■&nbsp;</div>격양 - {}</li>
                <li><div className="index" style={{color:"#95BEEF"}}>■&nbsp;</div>슬픔 - {}</li>
                <li><div className="index" style={{color:"#B3EBD8"}}>■&nbsp;</div>긴장 - {}</li>
                <li><div className="index" style={{color:"#E3E0EC"}}>■&nbsp;</div>평범 - {}</li>
            </ul>
            <p className="chart-sub-title">회의는 전반적으로 {top_feeling} 분위기였네요!</p>
            
        </div>
    )
}

export default EmotionGraph;