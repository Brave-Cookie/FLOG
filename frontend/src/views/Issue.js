import React, { useEffect, useState } from 'react';
import HeaderAuth from '../components/HeaderAuth';
import Sidebar from '../components/Sidebar';
import Modal from 'react-awesome-modal';
import { addIssue } from '../api/axios';
import axios from 'axios';
import origin from "../api/origin";

function Issue(props) {

    const [user_id, set_userId] = useState(props.match.params.userId);
    const [project_id, set_projectId] = useState(props.match.params.projectId);
    const [project_name, set_projectName] = useState(props.match.params.projectName);
    const [issue, set_issue] = useState("");
    const [modal, set_modal] = useState(false);
    const [issues, set_issues] = useState([]);

    useEffect(() => {
        axios.get(`${origin.express}/project/issue/list/${project_id}`)
            .then((res) => {
                console.log(res);
                set_issues(res.data.list);
            })
    }, [])

    const openModal = () => {
        set_modal(true);
    }
    const closeModal = () => {
        set_modal(false);
        set_issue("");
    }
    const onIssueHandler = (event) => {
        set_issue(event.currentTarget.value);
    }

    const newIssue = async () => {
        if(issue!==""){
            set_modal(false);
            var res = await addIssue(project_id, issue);
            if(res.status == 200){
                // 삽입성공신호 오면 issues 리스트에 새로 입력된 issue를 추가 -> 화면에 추가됨
                issues.push({issue_content : issue})
                alert('💡 이슈가 등록되었습니다.');
                set_issue("");
            }
            else{
                alert('⚠ 이슈 등록에 실패했습니다.');
            }
        }
        else {
            alert('⚠ 내용을 입력해주세요. ⚠')
        }
    }

    const issue_input ={
        resize: 'none',
        fontSize: '17px',
        padding: '5px',
        overflow: 'auto',
        width: '270px',
        height: '120px',
        fontFamily: 'NEXON Lv2 Gothic Light',
    }

    return(
        <div>
            <HeaderAuth />
            <Sidebar user_id={user_id} project_id={project_id} project_name={project_name} />
            <br /><br /><br />

            <div className="project-content">
                <h3 style={{ fontSize: "23px" }}>💡 Issue <button className="issue-button" onClick={openModal}>+ 이슈 등록</button></h3> 
                <p style={{ fontSize: "17px" }}>팀원 모두가 공유해야 하는 간단한 공지사항이나 링크 등을 이슈에 등록해보세요.</p>
                {(function () {
                    if (issues.length === 0) {
                        return (<p className="issue-content" style={{ color: "#b9bada",  fontSize: "17px", lineHeight: "24px" }}>- 당신이 바로 개척자! 첫 이슈를 등록해보세요.</p>);
                    }
                    else {
                        return (
                            <div className="issue-content">
                            {issues.map((issue, id) =>(
                                <li className="issue-item" key={id}>
                                    -&nbsp;&nbsp;{issue.issue_content}
                                    <hr color="#b9bada" noshade="noshade" size="1" />
                                </li>
                            ))}
                            
                            </div>
                        )
                    }
                })()}
            </div>
            
                
            <Modal visible={modal} width="400" height="300" effect="fadeInUp">
            <div>
                <h3>내용을 입력하세요.</h3>
                <br />
                <textarea value={issue} onChange={onIssueHandler} style={issue_input} />
                <br /><br />
                <button className="close-button" onClick={newIssue}>이슈 등록</button>
                <button className="close-button" onClick={closeModal}>창 닫기</button>
            </div>
            </Modal>
        </div>
    )
}

export default Issue;