import axios from 'axios'

/*
const instance = axios.create({
    baseURL: 'http://localhost:8080',
})
*/

function registerUser(userData) {
    const url = '/auth/register';
    return axios.post(url, userData);
}

export { registerUser }