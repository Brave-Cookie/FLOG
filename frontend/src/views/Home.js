import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Header from '../components/Header';
import LOGO from '../assets/image/logo.png'

function Home(props) {
    return(
        <div className="home">
            <Header />
            
            <h3>FLOG를 통해 감정이 담긴 회의록을 만나보세요.</h3>
            <Link to="/login">시작하기</Link>
        </div>
    )
}

export default withRouter(Home);