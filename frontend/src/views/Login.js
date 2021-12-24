import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
//import { Provider, useDispatch } from 'react-redux'
import { userLogin } from '../api/axios.js'
//import { login } from '../action/auth';


async function getLogin(props, user_id, user_pw) {
    console.log(3);
    var res = await userLogin(user_id, user_pw);
    console.log(res);
    if (res.status === 200) {
        const token = res.data.accessToken;
        console.log(token);
        localStorage.setItem('accessToken', token);
        if (localStorage.getItem('accessToken')) {
            props.history.push(`/mypage/${user_id}`)
        }
        return true;
    }
    else if (res.status === 202) {
        if (res.data.code === 'login_1') {
            alert('가입되지 않은 아이디입니다.');
        }
        else if (res.data.code === 'login_2') {
            alert('비밀번호가 일치하지 않습니다.');
        }
        return false;
    }
    return false;
};

function Login(props) {

    //const dispath = useDispatch();
    const [user_id, set_id] = useState("");
    const [user_pw, set_pw] = useState("");

    const onIdHandler = (event) => {
        set_id(event.currentTarget.value);
    }
    const onPwHandler = (event) => {
        set_pw(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log(0);
        if (user_id === "" || user_pw === "") {
            return alert('모든 정보를 입력해주세요.')
        }
        getLogin(props, user_id, user_pw)
        
    }

    return (
        <div className="content">
            <Header />
            <br /><br />
            <h2>로그인</h2>
            <div className="form-content">
                <form onSubmit={onSubmitHandler}>
                    <input className="login-input" id="user_id" name="user_id" placeholder="ID" onChange={onIdHandler} /> <br />
                    <input className="login-input" id="user_pw" name="user_pw" type="password" placeholder="Password" onChange={onPwHandler} /> <br />
                    <br />
                    <button className="login-button" type="submit">로그인</button>
                </form>
                <br />
                <div style={{color: "#6D42F8"}}>
                    <Link to="/signup">회원가입</Link> | <Link to="/login">비밀번호 찾기</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;