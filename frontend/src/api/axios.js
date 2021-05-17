import axios from 'axios'

// axios는 백엔드에 데이터를 요청하는 경우에
// 그 경로와 넘겨줄 정보 등을 함수로 작성

function registerUser(userData) {
    const url = '/api/auth/register';
    return axios.post(url, userData);
}

function createProject(user_id, project_name) {
    const url = '/api/project/create';
    return axios.post(url, { user_id, project_name });
}

function getProject(user_id) {
    const url = '/api/project/list/' + user_id;
    return axios.get(url)
}

function getProjectName() {
    const url = '/api/project/list/:project-id';
    return axios.get(url);
}

export { registerUser, createProject, getProject, getProjectName }