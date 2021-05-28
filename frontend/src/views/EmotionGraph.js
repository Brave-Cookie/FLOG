import React, { useEffect, useState } from 'react';
import HeaderAuth from '../components/HeaderAuth';
import SidebarLog from '../components/SidebarLog';
//import { Chart, registerables } from 'chart.js';
import { PieChart } from 'react-minimal-pie-chart';
import { Line } from "react-chartjs-2";
import axios from 'axios';



function EmotionGraph(props) {
    const [user_id, set_userId] = useState(props.match.params.userId);
    const [project_id, set_projectId] = useState(props.match.params.projectId);
    const [project_name, set_projectName] = useState(props.match.params.projectName);
    const [meeting_id, set_logId] = useState(props.match.params.meetingId);

    const [avg_feeling, set_avgFeeling] = useState([]);
    const [pi_feeling, set_piFeeling] = useState([]);

    const [top_feeling, set_topFeeling] = useState();
    const [happy_count, set_happyCount] = useState();
    const [neutral_count, set_neutralCount] = useState();
    const [fear_count, set_fearCount] = useState();
    const [sad_count, set_sadCount] = useState();
    const [anger_count, set_angerCount] = useState();
    
    useEffect(() => {
        axios.get('https://localhost:5000/api/log/feelingCount/' + meeting_id)
          .then((res) => {
            let dic = res.data[1];
            console.log(dic);

            let happy = 0;
            let anger = 0;
            let neutral = 0;
            let sad = 0;
            let fear = 0;
            let sum = dic[0][1]+dic[1][1]+dic[2][1]+dic[3][1]+dic[4][1];

            for(let i=0;i<5;i++){
              console.log(dic[i][0], dic[i][1])
              if(dic[i][0] === "happiness") {
                happy = dic[i][1];
              }
              else if(dic[i][0] === "neutral") {
                neutral = dic[i][1];
              }
              else if(dic[i][0] === "fear") {
                fear = dic[i][1];
              }
              else if(dic[i][0] === "sadness") {
                sad = dic[i][1];
              }
              else if(dic[i][0] === "anger") {
                anger = dic[i][1];
              }

            }
            
            let data = [
              { title: '기쁨', value: happy, color: '#FFFF85' },
              { title: '격양', value: anger, color: '#FFB7DD' },
              { title: '평범', value: neutral, color: '#E3E0EC' },
              { title: '슬픔', value: sad, color: '#95BEEF' },
              { title: '긴장', value: fear, color: '#B3EBD8' },
            ]

            set_piFeeling(data);

            set_happyCount(Math.round((happy/sum)*100));
            console.log(happy, sum, );
            set_neutralCount(Math.round((neutral/sum)*100));
            set_fearCount(Math.round((fear/sum)*100));
            set_sadCount(Math.round((sad/sum)*100));
            set_angerCount(Math.round((anger/sum)*100));

            if(dic[0][0] === "happiness"){
              set_topFeeling("적극적인");
            }
            else if(dic[0][0] === "neutral") {
              set_topFeeling("평온한");
            }
            else if(dic[0][0] === "fear") {
              set_topFeeling("긴장된");
            }
            else if(dic[0][0] === "sadness") {
              set_topFeeling("우울한");
            }
            else {
              set_topFeeling("격양된");
            }
          })
    }, [])

    const chartData = [50, 50, 40, 20, 30, 10, 40, 50]
    const graph_data = {
        // x축 하단 표시되는 값
        labels: ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30"],
        // 점 찍을 데이타
        datasets: [
            //원소 1
          {
            label: "50:😃 / 40:🙂 / 30:😨 / 20:😥 / 10:😡",
            data: chartData,
            lineTension: 0,
            backgroundColor: "rgba(158, 163, 234, 0.5)",
            borderWidth: 1,
            borderColor: "#9373ff",
            fill: false,
          },
        ],
      };
      
      const options = {
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: {
            y: {
                ticks: {
                  stepSize: 10
                },
              }
        },
        maintainAspectRatio: false // false로 설정 시 사용자 정의 크기에 따라 그래프 크기가 결정됨.
    }

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
                <div className="graph-index">
                    <p className="graph-index-item">😃</p>
                    <p>🙂</p>
                    <p>😨</p>
                    <p>😥</p>
                    <p>😡</p>
                </div>
                <div className="emotion-graph">
                <Line data={graph_data} options={options} />
                <br />
                <p>세로축의 숫자는 각각 😃(기쁨), 🙂(평범), 😨(긴장), 😥(슬픔), 😡(격양)을 나타냅니다.</p>
                </div>
            </div>
    
            <div className="pi-chart-title">
                <h3>전체 감정 분석</h3>
                <hr color="#EEEFFC" noshade="noshade" size="2"></hr>
            </div>

            <div className="chart-box">
                <PieChart data={pi_feeling} />
            </div>
            <ul className="chart-index">
                <li><div className="index" style={{color:"#FFFF85"}}>■&nbsp;</div> 기쁨 - {happy_count}%</li>
                <li><div className="index" style={{color:"#FFB7DD"}}>■&nbsp;</div>격양 - {anger_count}%</li>
                <li><div className="index" style={{color:"#95BEEF"}}>■&nbsp;</div>슬픔 - {sad_count}%</li>
                <li><div className="index" style={{color:"#B3EBD8"}}>■&nbsp;</div>긴장 - {fear_count}%</li>
                <li><div className="index" style={{color:"#E3E0EC"}}>■&nbsp;</div>평범 - {neutral_count}%</li>
            </ul>
            <p className="chart-sub-title">회의는 전반적으로 {top_feeling} 분위기였네요!</p>
            
        </div>
    )
}

export default EmotionGraph;