import React, { useEffect, useState } from 'react';
import HeaderAuth from '../components/HeaderAuth';
import Sidebar from '../components/Sidebar';
import { addMember, searchMember } from '../api/axios';
import axios from 'axios';
import origin from "../api/origin";

function Member(props) {

    const [user_id, set_userId] = useState(props.match.params.userId);
    const [project_id, set_projectId] = useState(props.match.params.projectId);
    const [project_name, set_projectName] = useState(props.match.params.projectName);

    const [search_name, set_searchName] = useState("");
    const [search_result, set_searchResult] = useState([]);
    const [current_members, set_currentMemebers] = useState([]);

    useEffect(() => {
        axios.get(`${origin.express}/project/member/list/${project_id}`)
            .then(res => {
                console.log(res);
                set_currentMemebers(res.data.list);
            })
    }, []);

    const onSearchNameHandler = (event) => {
        set_searchName(event.currentTarget.value);
    }

    const searchUser = () => {
        const res = searchMember(search_name)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    set_searchResult(res.data.list);
                    set_searchName("");
                }
                else if (res.status === 202) {
                    alert('⚠ 존재하지 않는 사용자 입니다. ⚠');
                }
            })
    }

    const addUser = async (event) => {
        let id = event.target.value;
        console.log(event.target);

        const res = await addMember(id, project_id);
        if (res.status === 200) {
            // 화면에 추가-참여자 추가
            set_currentMemebers([...current_members, {'user_id' : id}])
            alert('🙊 프로젝트에 새로운 참가자가 추가되었습니다.');
        }
        else if (res.status === 202) {
            alert('⚠ 이미 추가된 사용자 입니다. ⚠');
        }
    }
    return (
        <div className="content">
            <HeaderAuth />
            <Sidebar user_id={user_id} project_id={project_id} project_name={project_name} />
            <br /><br />

            <div className="member-wrap">

                <div className="search-member">
                    <h3>참여자 관리</h3>
                    <div className="search-box">
                        <input className="search-input" type="text" name="search_name" placeholder="이름을 입력하세요." onChange={onSearchNameHandler}></input>
                        <button className="search-button" onClick={searchUser}>🔎</button>
                        <hr color="#b9bada" noshade="noshade" size="1" />
                        <ul>
                            {search_result.map((user, id) => (
                                <li key={id} className="member-list">
                                    - {user.user_id}
                                    <button className="add-button" value={user.user_id} onClick={addUser}>추가</button><br />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="current-member">
                    <h3>현재 참여자 목록</h3>
                    <div className="current-box">
                        <div>
                            {current_members.map((user, id) => (
                                <li key={id} className="member-list">
                                    -&nbsp;&nbsp; {user.user_id}
                                </li>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Member;