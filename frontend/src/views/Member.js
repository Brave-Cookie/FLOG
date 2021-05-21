import React, { useState } from 'react';
import HeaderAuth from '../components/HeaderAuth';
import Sidebar from '../components/Sidebar';
import { searchMember } from '../api/axios';


async function search(search_name) {
    const res = await searchMember(search_name);
    console.log(res);
    return res;
}

function Member(props) {

    const [user_id, set_userId] = useState(props.match.params.userId);
    const [project_id, set_projectId] = useState(props.match.params.projectId);
    const [project_name, set_projectName] = useState(props.match.params.projectName);
    
    const[search_name, set_searchName] = useState("");
    const[search_result, set_searchResult] = useState([]);
    const[current_members, set_currentMemebers] = useState([]);

    const onSearchNameHandler = (event) => {
        set_searchName(event.currentTarget.value);
    }

    const searchUser = () => {
        const res = searchMember(search_name)
        .then((res) => {
            console.log(res);
        })
        console.log(res);
        /*if(res.status === 200){
            set_searchResult(res.data.list);

            set_searchName("");
        }
        else {
            alert('존재하지 않는 사용자입니다.');
        }*/
        //window.location.replace('/'+user_id+'/project/'+project_id+"/"+project_name+"/member");
    }

    return(
        <div className="content">
            <HeaderAuth />
            <Sidebar user_id={user_id} project_id={project_id} project_name={project_name} />
            <br /><br />
            
            <div className="project-content">
                <h3>참여자 관리</h3>
                <div className="search-member">
                    <input className="search-input" type="text" name="search_id" placeholder="이름을 입력하세요." onChange={onSearchNameHandler}></input>
                    <button className="search-button" onClick={searchUser}>🔎</button>
                    <hr />
                    {search_result.map((user, id) =>(
                    <li key={id}>
                        {user.user_id} <button className="button">추가</button>
                    </li>
                ))}
                </div>
                <div className="current-member">

                </div>
            </div>
            
        </div>
    )
}

export default Member;