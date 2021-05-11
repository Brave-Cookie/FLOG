import axios from 'axios'

// axios는 백엔드에 데이터를 요청하는 경우에
// 그 경로와 넘겨줄 정보 등을 함수로 작성

function registerUser(userData) {
    const url = '/api/auth/register';
    return axios.post(url, userData);
}

export { registerUser }