import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/image/logo_bg.PNG';

class Header extends Component {
    render() {
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
                    <Link to="/login">&nbsp;LOGIN</Link>&nbsp;
                    <Link to="/">&nbsp;HOME&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Link>&nbsp;

                </div>
            </div>
        );
    }
}

export default Header;