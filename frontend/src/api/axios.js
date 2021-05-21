import axios from "axios";

const DefalutAxios = axios.create({
    baseURL : 'http://localhost:3000/api'
})

export function registUser(user_data){
    return DefalutAxios.post('/auth/register',user_data);
}

export function userLogin(user_id, user_pw){
    return DefalutAxios.post('/auth/login', { user_id, user_pw });
}

export function createProject(user_id, project_name) {
    return DefalutAxios.post('/project/create', { user_id, project_name });
}

/*
// getProject 는 Mypage.js에서 바로 axios 호출함
export function getProject(user_id) {
    return DefalutAxios.get('/project/list/' + user_id);
}
*/

export function addIssue(project_id, issue_content) {
    return DefalutAxios.post('/project/issue/create', { project_id, issue_content});
}

export function searchMember(user_name){
    return DefalutAxios.get('/project/member/search/' + user_name);
}

export function addMember(user_id, project_id) {
    return DefalutAxios.post('/project/member/add');
}

