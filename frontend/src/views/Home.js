import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Header from '../components/Header';
import Logo from '../assets/image/logo.png'
import axios from 'axios';

function Home(props) {

    const logo_image = {
        height: '300px',
    }
    // 홈으로 이동시 로컬 스토리지의 인증 토큰 삭제
    delete localStorage.accessToken;


    /* rest api 테스트용
    function chk_express(){
        axios.post('https://flog-express.tk/api/test/chk_DB').then(
            res => {
                console.log(res)
            }
        )
    }
    function chk_flask(){
        axios.post('https://flog-flask.tk/api/test').then(
            res => {
                console.log(res)
            }
        )
    }
    function chk_local_express(){
        axios.post('http://localhost:3000/api/test/chk_DB').then(
            res => {
                console.log(res)
            }
        )
    }
    function chk_local_flask(){
        axios.post('http://localhost:5000/api/test').then(
            res => {
                console.log(res)
            }
        )
    }*/

    
    return(
        <div className="home">
            <div className="home-container">
                
                {/* 
                <br/>
                <button onClick={chk_express}>chk_express</button>
                <button onClick={chk_flask}>chk_flask</button>
                <button onClick={chk_local_express}>chk_local_express</button>
                <button onClick={chk_local_flask}>chk_local_flask</button>
                    */}
            
                <div className="home-link">
                    <p style={{ fontWeight: "bold", color: "#6D42F8" }}>-</p>
                    <Link to="/login" style={{ fontWeight: "bold" }}>START</Link>
                </div>
                <div className="demo_link">
                    <p style={{ fontWeight: "bold", color: "#6D42F8" }}>-</p>
                    {/* FIXME */}
                    <Link to="/" style={{ fontWeight: "bold" }}>DEMO</Link>
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