import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Header from '../components/Header';
import Logo from '../assets/image/logo.png'

function Home(props) {

    const logo_image = {
        height: '300px',
    }
    // 홈으로 이동시 로컬 스토리지의 인증 토큰 삭제
    delete localStorage.accessToken;
    
    return(
        <div className="home">
            <div className="home-container">
                <div className="home-link">
                    <p style={{ fontWeight: "bold", color: "#6D42F8" }}>-</p>
                    <p>HOME</p>
                    <Link to="/login" style={{ color: '#595959'}}>START</Link>
                </div>
        
                <div className="home-title">
                    FLOG를 통해 감정이 담긴<br />회의록을 만나보세요
                </div>

                <div className="home-sub">
                    <span style={{ fontSize: "22px", fontFamily:"GmarketSansMedium", fontWeight: "bold", color: "#6D42F8" }}>-<br /></span>
                    음성 감정 인식 기반<br />실시간 화상 회의 및 회의록 요약 서비스
                </div>

                <div className="home-logo">
                    <img src={Logo} style={logo_image}></img>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Home);