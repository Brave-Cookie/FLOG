import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {

        return (
            <div className="header">
                <div style={{fontSize:'20px'}}>FLOG</div> 
                <div className="header-nav">
                    <Link to="/"> HOME</Link> |
                    <Link to="/login"> LOGIN</Link>
                </div>       
            </div>
        );
    }
}

export default Header;