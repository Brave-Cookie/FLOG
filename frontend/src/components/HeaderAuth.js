import React from 'react';
import { NavLink } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import logo from '../assets/image/logo_bg.PNG';

function HeaderAuth(props) {
    const getLogout = () => {
        delete localStorage.accessToken;
        alert('로그아웃되었습니다. 홈으로 이동합니다.')
        //props.history.push('/');
    }
    const user_id = jwt_decode(localStorage.accessToken).user_id;

    const is_active = {
        color: '#FFFFB9',
    }

    const logo_image = {
        height: '45px',
        marginLeft: '5px',
        marginRight: '5px',
        marginTop: '-8px'
    }

    return (
        <div className="header">
            <div className="logo">
            <img src={logo} style={logo_image}></img>
            </div>
            <p className="logo-copy-front">감정을 기록하다. F</p><p className="logo-copy-mid">eeling </p><p className="logo-copy-end">LOG</p>
            <div className="header-nav">
                <a href="/" onClick={getLogout}>&nbsp;LOGOUT&nbsp;</a>
                <NavLink exact activeStyle={is_active} to={`/mypage/${user_id}`}>&nbsp;MYPAGE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</NavLink>
                
            </div>       
        </div>
    );
    
}

export default HeaderAuth;