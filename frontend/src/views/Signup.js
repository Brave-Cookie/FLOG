import React, { useState } from 'react';
//import { withRouter } from 'react-router-dom';
import { registUser } from '../api/axios.js'
//import { useAsync } from 'react-async';
import Header from '../components/Header';

async function register(user_data) {
    var res = await registUser(user_data);
    if (res.status === 200) {
        alert('회원가입이 완료되었습니다. 로그인으로 이동합니다.');
        return true;
    }
    else if (res.status === 202) {
        if (res.data.code === 'register_1') {
            alert('중복된 아이디가 존재합니다.');
        }
    }
    return false;
};

function Signup(props) {

    const [user_name, set_name] = useState("");
    const [user_id, set_id] = useState("");
    const [user_email, set_email] = useState("");
    const [user_pw, set_pw] = useState("");
    const [pwConfirm, set_pwConfirm] = useState("");

    const onNameHandler = (event) => {
        set_name(event.currentTarget.value);
    }
    const onIdHandler = (event) => {
        set_id(event.currentTarget.value);
    }
    const onEmailHandler = (event) => {
        set_email(event.currentTarget.value);
    }
    const onPwHandler = (event) => {
        set_pw(event.currentTarget.value);
    }
    const onPwConfirmHandler = (event) => {
        set_pwConfirm(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (user_pw !== pwConfirm) {
            return alert('비밀번호가 일치하지 않습니다.');
        }
        if (user_name === "" || user_id === "" || user_email === "" || user_pw === "" || pwConfirm === "") {
            return alert('모든 정보를 입력해주세요.')
        }

        let user_data = {
            user_name: user_name,
            user_id: user_id,
            user_email: user_email,
            user_pw: user_pw,
            pwConfirm: pwConfirm,
        }

        if (register(user_data)) {
            props.history.push('/login');
        }
    };

    return (
        <div className="content">
            <Header />
            <br /><br />
            <h2>회원가입</h2>

            <form className="signup-form" onSubmit={onSubmitHandler}>
                <ul>
                    <li className="signup-list">
                        <label>이름 </label>
                        <input className="signup-input" type="text" value={user_name} onChange={onNameHandler} /></li>
                    <li className="signup-list">
                        <label>아이디</label>
                        <input className="signup-input" type="text" value={user_id} onChange={onIdHandler} /></li>
                    <li className="signup-list">
                        <label>이메일</label>
                        <input className="signup-input" type="email" value={user_email} onChange={onEmailHandler} /></li>
                    <li className="signup-list">
                        <label>비밀번호</label>
                        <input className="signup-input" type="password" value={user_pw} onChange={onPwHandler} /></li>
                    <li className="signup-list">
                        <label>비밀번호확인 </label>
                        <input className="signup-input" type="password" value={pwConfirm} onChange={onPwConfirmHandler} /> </li>
                </ul><br />
                <button className="signup-button" type="submit">회원가입</button>
            </form>
        </div>

    )
}

export default Signup;