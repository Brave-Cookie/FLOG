import axios from 'axios'

/*
const instance = axios.create({
    baseURL: 'http://localhost:8080',
})
*/

function registerUser(userData) {
    const url = 'http://localhost:3000/signup';
    return axios.post(url, userData);
}

export { registerUser }