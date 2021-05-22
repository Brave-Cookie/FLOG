import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {

        return (
            <div className="header">
                <div className="logo" style={{fontSize:'20px'}}></div> 
                <div className="header-nav">
                    <Link to="/login">&nbsp;LOGIN</Link>&nbsp;
                    <Link to="/">&nbsp;HOME</Link>&nbsp;
                    
                </div>       
            </div>
        );
    }
}

export default Header;