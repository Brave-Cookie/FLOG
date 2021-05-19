import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
//import { Provider, useDispatch } from 'react-redux'
import { userLogin } from '../api/axios.js'
//import { login } from '../action/auth';


async function getLogin(user_id, user_pw) {
    var res = await userLogin(user_id, user_pw);
    console.log(res);
    if(res.status === 200) {
        const token = res.data.accessToken;
        console.log(token);
        localStorage.setItem('accessToken', token);
        return true;
    }
    else if(res.status === 202) {
        if(res.data.code === 'login_1'){
            alert('가입되지 않은 아이디입니다.');
        }
        else if(res.data.code === 'login_2') {
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

        if(user_id===""||user_pw===""){
            return alert('모든 정보를 입력해주세요.')
        }


        if(getLogin(user_id, user_pw)){
            if(localStorage.getItem('accessToken')) {
                props.history.push('/mypage/'+user_id);
            }
        }
    }

    return(
        <div className="content">
            <Header />

            <h3>로그인</h3>
            <form onSubmit={onSubmitHandler}>
                <input id="user_id" name="user_id" placeholder="ID" onChange={onIdHandler}/> <br />
                <input id="user_pw" name="user_pw" type="password" placeholder="Password" onChange={onPwHandler} /> <br />
                
                <button type="submit">로그인</button>
            </form>
            <br />
            <Link to="/signup">회원가입</Link>
        </div>
    )
}

export default Login;