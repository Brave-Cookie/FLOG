import React, { useState } from 'react';
import HeaderAuth from '../components/HeaderAuth';
import Sidebar from '../components/Sidebar';
import { addMember, searchMember } from '../api/axios';


function Member(props) {

    const [user_id, set_userId] = useState(props.match.params.userId);
    const [project_id, set_projectId] = useState(props.match.params.projectId);
    const [project_name, set_projectName] = useState(props.match.params.projectName);

    const [search_name, set_searchName] = useState("");
    const [search_result, set_searchResult] = useState([]);
    const [current_members, set_currentMemebers] = useState([]);

    const onSearchNameHandler = (event) => {
        set_searchName(event.currentTarget.value);
    }

    const searchUser = () => {
        const res = searchMember(search_name)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    set_searchResult(res.data.list);
                    console.log(search_result);
                    set_searchName("");
                }
                else if (res.status === 202) {
                    alert('존재하지 않는 사용자 입니다.');
                }
                // 여기선 새로고침하면 검색 내역이 사라짐
                //window.location.replace('/'+user_id+'/project/'+project_id+"/"+project_name+"/member");
            })
    }

    const addUser = () => {
        const res = addMember(user_id, project_id)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    //set_currentMemebers(res.data.list);
                }
                else if (res.status === 202) {
                    alert('이미 추가된 사용자 입니다.');
                }
                window.location.replace('/' + user_id + '/project/' + project_id + "/" + project_name + "/member");
            })
    }

    return (
        <div className="content">
            <HeaderAuth />
            <Sidebar user_id={user_id} project_id={project_id} project_name={project_name} />
            <br /><br />

            <div className="project-content">

                <div className="search-member">
                    <h3>참여자 관리</h3>
                    <input className="search-input" type="text" name="search_name" placeholder="이름을 입력하세요." onChange={onSearchNameHandler}></input>
                    <button className="search-button" onClick={searchUser}>🔎</button>
                    <hr color="#b9bada" noshade="noshade" size="1" />
                    <div>
                        {search_result.map((user, id) => (
                            <li key={id}>
                                {user.user_id} <button className="add-button" onClick={addUser}>추가</button>
                            </li>
                        ))}
                    </div>
                </div>
                <div className="current-member">
                    <h3>현재 참여자 목록</h3>
                    <hr color="#b9bada" noshade="noshade" size="1" />
                    <div>
                        {current_members.map((user, id) => (
                            <li key={id}>
                                {user.user_name}
                            </li>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Member;