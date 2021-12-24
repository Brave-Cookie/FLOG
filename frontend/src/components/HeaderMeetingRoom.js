import React, { Component } from 'react';
import logo from '../assets/image/logo_bg.PNG';

class HeaderMeetingRoom extends Component {
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
                
            </div>
        );
    }
}

export default HeaderMeetingRoom;