import React, { useEffect, useState } from 'react';
import HeaderAuth from '../components/HeaderAuth';
import SidebarLog from '../components/SidebarLog';
//import { Chart, registerables } from 'chart.js';
import { PieChart } from 'react-minimal-pie-chart';
import { Line } from "react-chartjs-2";
import axios from 'axios';
import origin from "../api/origin";


function EmotionGraph(props) {
    const [user_id, set_userId] = useState(props.match.params.userId);
    const [project_id, set_projectId] = useState(props.match.params.projectId);
    const [project_name, set_projectName] = useState(props.match.params.projectName);
    const [meeting_id, set_logId] = useState(props.match.params.meetingId);
    const [meeting_name, set_meetingName] = useState(props.match.params.meetingName);

    const [avg_feeling, set_avgFeeling] = useState([]);
    const [avg_time, set_avgTime] = useState([]);
    const [pi_feeling, set_piFeeling] = useState([]);

    const [top_feeling, set_topFeeling] = useState("");
    const [feedback, set_feedback] = useState("");

    const [happy_count, set_happyCount] = useState("0");
    const [neutral_count, set_neutralCount] = useState("0");
    const [fear_count, set_fearCount] = useState("0");
    const [sad_count, set_sadCount] = useState("0");
    const [anger_count, set_angerCount] = useState("0");
    
    useEffect(() => {
        axios.get(`${origin.flask}/log/feelingCount/${meeting_id}`)
          .then((res) => {
            let dic = res.data[1];
            console.log(dic);

            let happy = 0;
            let anger = 0;
            let neutral = 0;
            let sad = 0;
            let fear = 0;
            
            for(let i=0;i<dic.length;i++){
              //console.log(dic[i][0], dic[i][1])
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
            let sum = happy + anger + neutral + sad + fear;
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
              set_topFeeling("적극적이고 에너제틱한");
              set_feedback("앞으로도 쭉 이 분위기를 유지해보아요!");
            }
            else if(dic[0][0] === "neutral") {
              set_topFeeling("평온한");
              set_feedback("다음 회의는 좀 더 다이나믹하게 의견을 주고받아 보는건 어때요?");
            }
            else if(dic[0][0] === "fear") {
              set_topFeeling("긴장된");
              set_feedback("가끔은 재치있는 말장난으로 분위기를 바꿔보는 것도 좋아요.");
            }
            else if(dic[0][0] === "sadness") {
              set_topFeeling("루즈하고 우울한");
              set_feedback("힘들고 지칠때도 있지만 우리 모두 힘내요 :)");
            }
            else {
              set_topFeeling("격양된");
              set_feedback("잠시 휴식이 필요할 때, * 화면 조정 중입니다. *");
            }
          })
    }, [])

    useEffect(() => {
      axios.get(`${origin.express}/meetingLog/log/avgFeeling/${meeting_id}`)
          .then(res => {
              let list = res.data.avg;
              let time = ['00:00'];
              let emotion = [50];
              for(let i=0; i<list.length; i++){
                  time.push(list[i].time);
                  if(list[i].emotion === "happiness") {
                    emotion.push(50);
                  }
                  else if(list[i].emotion === "neutral") {
                    emotion.push(40);
                  }
                  else if(list[i].emotion === "fear") {
                    emotion.push(30);
                  }
                  else if(list[i].emotion === "sadness") {
                    emotion.push(20);
                  }
                  else if(list[i].emotion === "anger") {
                    emotion.push(10);
                  }
              }
              
              set_avgFeeling(emotion);
              set_avgTime(time);
          })
    }, [])

    console.log(avg_feeling);
    console.log(avg_time);

    const chartData = avg_feeling;
    const graph_data = {
        // x축 하단 표시되는 값
        labels: avg_time,
        datasets: [
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
            <SidebarLog user_id={user_id} project_id={project_id} project_name={project_name} meeting_id={meeting_id} meeting_name={meeting_name}/>
            <br /><br />
            <div className="graph-title">
                <h3 style={{ fontSize: '20px' }}>📈 평균 감정 그래프</h3>
                <p className="graph-sub-title" style={{ fontSize: '16px' }}>시간에 따른 회의 전체의 감정 변화를 보여줍니다.</p>
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
                <h3 style={{ fontSize: '20px' }}>전체 감정 분석</h3>
                <p style={{ fontSize: '16px' }}>회의의 전반적인 감정 분포는 어땠나요?</p>
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
            <p className="chart-sub-title" style={{ fontSize: '17px' }}>
              회의는 전반적으로 <span style={{ fontWeight: 'bold' }}>{top_feeling}</span> 분위기였네요!<br />
              👉 {feedback}
            </p>
            
        </div>
    )
}

export default EmotionGraph;