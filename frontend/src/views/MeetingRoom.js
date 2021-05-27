import React, {Component } from 'react';
import HeaderMeetingRoom from '../components/HeaderMeetingRoom';


class MeetingRoom extends Component {

    componentDidMount() {
      // ------------------------------------------------------ Web RTC 요소 선언 ------------------------------------------------------

      var connection = new window.RTCMultiConnection();
      connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

      connection.session = {
          audio: true,
          video: true
      };

      connection.sdpConstraints.mandatory = {
          OfferToReceiveAudio: true,
          OfferToReceiveVideo: true
      };

      connection.onstream = function (event) {
          document.body.appendChild(event.mediaElement);
      };

      // ------------------------------------------------------ 이벤트 핸들링 ------------------------------------------------------

      // url로 코드와 상태 정보를 받아옴.
      const room_state = this.props.match.params.roomState;
      const room_code = this.props.match.params.roomCode;

      // 회의방 생성시
      if(room_state == 'open'){
        console.log('생성')
        connection.open(room_code);
      }

      // 회의방 입장시
      else{
        console.log('입장')
        connection.join(room_code);
      }

    }

    render() {
      

      return (
          <div>
            <HeaderMeetingRoom />
            
            <p>회의방 {this.props.match.params.meetingName}</p>

            <hr/>
            <p>여기 아래에 화면 생성됨</p>
           
        
          </div>
      );
    }
}

export default MeetingRoom;