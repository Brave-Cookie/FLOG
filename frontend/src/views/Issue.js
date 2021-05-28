import React, { useEffect, useState } from 'react';
import HeaderAuth from '../components/HeaderAuth';
import Sidebar from '../components/Sidebar';
import Modal from 'react-awesome-modal';
import { addIssue } from '../api/axios';
import axios from 'axios';


async function addNewIssue(project_id, issue_content) {
    var res = await addIssue(project_id, issue_content);
    console.log(res);

    return res;
}

function Issue(props) {

    const [user_id, set_userId] = useState(props.match.params.userId);
    const [project_id, set_projectId] = useState(props.match.params.projectId);
    const [project_name, set_projectName] = useState(props.match.params.projectName);
    const [issue, set_issue] = useState("");
    const [modal, set_modal] = useState(false);
    const [issues, set_issues] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:3000/api/project/issue/list/' + project_id)
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
    }
    const onIssueHandler = (event) => {
        set_issue(event.currentTarget.value);
    }

    const newIssue = () => {
        if(issue!==""){
            const res = addNewIssue(project_id, issue);
            alert('이슈가 등록되었습니다.');
            // clear
            set_issue("");
            set_modal(false);

            window.location.replace('/'+user_id+'/project/'+project_id+"/"+project_name+"/issue");
        }
        else {
            alert('내용을 입력해주세요.')
        }
    }

    return(
        <div>
            <HeaderAuth />
            <Sidebar user_id={user_id} project_id={project_id} project_name={project_name} />
            <br /><br /><br />

            <div className="project-content">
                <h3>🔔 Issue <button className="issue-button" onClick={openModal}>+ 이슈 등록</button></h3> 
                

                <div className="issue-content">
                {issues.map((issue, id) =>(
                    <li className="issue-item" key={id}>
                        -&nbsp;&nbsp;{issue.issue_content}
                        <hr color="#b9bada" noshade="noshade" size="1" />
                    </li>
                ))}
                
                </div>
            </div>
            
                
            <Modal visible={modal} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
            <div>
                <h4>내용을 입력하세요.</h4>
                <br />
                <input type="text" value={issue} onChange={onIssueHandler} />
                <br /><br />
                <button className="close" onClick={newIssue}>이슈 등록</button>
                <button className="close" onClick={closeModal}>창 닫기</button>
            </div>
            </Modal>
        </div>
    )
}

export default Issue;