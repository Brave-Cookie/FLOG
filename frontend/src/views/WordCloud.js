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

    const [summury_text, set_summury] = useState();
    const [wordcloud,set_wordcloud] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/log/wordcloud/' + meeting_id)
            .then(res => {
                console.log(res);
            })
    }, [])
    useEffect(() => {
        axios.get('http://localhost:5000/api/log/summary/' + meeting_id)
            .then(res => {
                console.log(res);
            })
    }, [])
    
    const data = [
        { value: '부분', count: 14 },
        { value: '진행', count: 8 },
        { value: '구현', count: 7 },
        { value: '프론트엔드', count: 20 },
        { value: '백엔드', count: 7 },
        { value: '뷰', count: 10 },
        { value: '프로젝트', count: 6 },
        { value: '프레임워크', count: 6 },
        { value: '저', count: 2 },
        { value: '기능', count: 6 },
        { value: '감정분석', count: 9 },
        { value: '서버', count: 1 },
        { value: '요약', count: 3 },
    ]

    const options = {
        luminosity: 'light',
        hue: 'blue',
    }

    return (
        <div className="content">
            <HeaderAuth />
            <SidebarLog user_id={user_id} project_id={project_id} project_name={project_name} meeting_id={meeting_id} />
            <br /><br />
            <div className="word-title">
                <h3>워드 클라우드</h3>
            </div>
            <div className="word-box">
                <div className="word-cloud">
                    <TagCloud minSize={18} maxSize={55} tags={data} colorOptions={options} />
                </div>
            </div>

            <div className="summury-title">
                <h3>회의 요약문</h3>
            </div>
            <div className="summury-box">
                <div className="summury">
                    
                </div>
            </div>

        </div>
    )
}

export default WordCloud;