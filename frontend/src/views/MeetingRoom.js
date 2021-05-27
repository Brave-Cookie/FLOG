import React, { Component } from 'react';
import HeaderMeetingRoom from '../components/HeaderMeetingRoom';

// 여기가 전역 변수인가봄
var connection = new window.RTCMultiConnection();
connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

class MeetingRoom extends Component {

  componentDidMount() {

   

    // ------------------------------------------------------ 이벤트 핸들링 ------------------------------------------------------

    // url로 코드와 상태 정보를 받아옴.
    const room_state = this.props.match.params.roomState;
    const room_code = this.props.match.params.roomCode;

    // 회의방 생성시
    if (room_state == 'open') {
      console.log('생성')
      connection.open(room_code);
    }

    // 회의방 입장시
    else {
      console.log('입장')
      connection.join(room_code);
    }

  }

  // {this.props.match.params.meetingName} -> 회의 방 이름 받아오는 부분
  render() {
    // render 안에 넣어줘야 하나봐
    // ------------------------------------------------------ Web RTC 요소 선언 ------------------------------------------------------

    connection.session = {
      audio: true,
      video: true
    };
  
    connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: true
    };
    
    // host connection
    connection.onstream = function (event) {
      connection.videosContainer = document.getElementById("videos-container");
      var video = document.createElement("video"); //비디오 컴포넌트를 생성한다.
      try {
        video.setAttributeNode(document.createAttribute("autoplay"));
        video.setAttributeNode(document.createAttribute("playsinline"));
      } catch (e) {
        video.setAttribute("autoplay", true);
        video.setAttribute("playsinline", true);
      }
      
      video.id = event.streamid; //각 비디오 화면에 각 스트림의 고유 식별자를 붙인다.

      video.style.width = "50";
      video.style.height = "30";
      //video.style.border = "solid 1px var(--greenish-teal)";

      event.mediaElement.removeAttribute("src");
      event.mediaElement.removeAttribute("srcObject");

      video.srcObject = event.stream; //비디오에 stream을 연결한다.

      //connection.videosContainer.style.width = "100%";

      connection.videosContainer.appendChild(event.mediaElement); //비디오를 div공간에 추가
      //document.videosContainer.appendChild(event.mediaElement);
      
      //document.getElementById("videos-container").appendChild(event.mediaElement);
    };

    return (
      <div>
        <HeaderMeetingRoom />

        <div className="left-component">
          <div className="video-box">
            <div className="videos-container" id="videos-container" />

          </div>
        </div>


      </div>
    );
  }
}

export default MeetingRoom;