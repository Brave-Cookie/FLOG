import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Header from '../components/Header';
import LOGO from '../assets/image/logo.png'

function Home(props) {

    // 홈으로 이동시 로컬 스토리지의 인증 토큰 삭제
    delete localStorage.accessToken;
    
    return(
        <div className="home">
            <Header />
            
            <h3>FLOG를 통해 감정이 담긴 회의록을 만나보세요.</h3>
            <Link to="/login">시작하기</Link>
        </div>
    )
}

export default withRouter(Home);