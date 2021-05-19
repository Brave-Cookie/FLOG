import React from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

function HeaderAuth(props) {
    
    const getLogout = () => {
        delete localStorage.accessToken;
        alert('로그아웃되었습니다. 홈으로 이동합니다.')
        //props.history.push('/');
    }
    const user_id = jwt_decode(localStorage.accessToken).user_id;

    return (
        <div className="header">
            <div style={{fontSize:'20px'}}>FLOG</div> 
            <div className="header-nav">
                <Link to={`/mypage/${user_id}`}> MYPAGE</Link> |
                <a href="/" onClick={getLogout}> LOGOUT</a>
            </div>       
        </div>
    );
    
}

export default HeaderAuth;