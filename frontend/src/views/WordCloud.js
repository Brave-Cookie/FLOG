import React, { useEffect, useState } from 'react';
import HeaderAuth from '../components/HeaderAuth';
import SidebarLog from '../components/SidebarLog';
import { TagCloud } from 'react-tagcloud';
import axios from 'axios';

function WordCloud(props) {
    const [user_id, set_userId] = useState(props.match.params.userId);
    const [project_id, set_projectId] = useState(props.match.params.projectId);
    const [project_name, set_projectName] = useState(props.match.params.projectName);
    const [meeting_id, set_logId] = useState(props.match.params.meetingId);
    const [meeting_name, set_meetingName] = useState(props.match.params.meetingName);

    const [summary_text, set_summary] = useState();
    const [wordcloud,set_wordcloud] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/log/wordcloud/' + meeting_id)
            .then(res => {
                console.log(res.data[1]);
                let list = res.data[1];
                let data = [];
                for(let i=0;i<15;i++){
                    data.push({value: list[i][0], count: list[i][1]});
                }
                console.log(data);
                set_wordcloud(data);
            })
    }, [])
    useEffect(() => {
        axios.get('http://localhost:5000/api/log/summary/' + meeting_id)
            .then(res => {
                console.log(res.data);
                set_summary(res.data[1]);
            })
    }, [])

    const options = {
        luminosity: 'light',
        hue: 'blue',
    }

    return (
        <div className="content">
            <HeaderAuth />
            <SidebarLog user_id={user_id} project_id={project_id} project_name={project_name} meeting_id={meeting_id} meeting_name={meeting_name}/>
            <br /><br />
            <div className="word-title">
                <h3 style={{ fontSize: '20px' }}>💬 워드 클라우드</h3>
                <p style={{ fontSize: '16px' }}>회의 내용 중 많이 등장한 단어들을 추출해 시각화합니다.</p>
            </div>
            <div className="word-box">
                <div className="word-cloud">
                    <TagCloud minSize={18} maxSize={60} tags={wordcloud} colorOptions={options} />
                </div>
            </div>
            <br />
            <div className="summary-title">
                <h3 style={{ fontSize: '20px' }}>회의 요약문</h3>
                <p style={{ fontSize: '16px' }}>긴 회의 내용을 빠르고, 간략하게 파악할 수 있어요!</p>
            </div>
            <div className="summary-box">
                <div className="summary">
                    {summary_text}
                </div>
            </div>

        </div>
    )
}

export default WordCloud;