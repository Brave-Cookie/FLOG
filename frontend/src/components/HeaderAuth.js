import React from 'react';
import { NavLink } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

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

    return (
        <div className="header">
            <div style={{fontSize:'20px'}}>FLOG</div> 
            <div className="header-nav">
                <NavLink exact activeStyle={is_active} to={`/mypage/${user_id}`}> MYPAGE</NavLink>
                <a href="/" onClick={getLogout}> LOGOUT</a>
            </div>       
        </div>
    );
    
}

export default HeaderAuth;