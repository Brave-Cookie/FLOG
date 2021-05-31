import React, { Component } from 'react';
import socketio from 'socket.io-client';
import axios from "axios";
import { MediaRecorder, register } from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';

import HeaderMeetingRoom from '../components/HeaderMeetingRoom';

import * as service from "./getHTMLMediaElement";


class MeetingRoom extends Component {

  componentDidMount() {
    // ------------------------------------------------------ init ------------------------------------------------------

    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ RAY @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // 여기에 url 파라미터 뽑아서 다 변수로 저장해놓음~

    // url로 코드와 상태 정보를 받아옴.
    const user_id = this.props.match.params.userId
    const room_state = this.props.match.params.roomState;
    const room_code = this.props.match.params.roomCode;
    const meeting_name = this.props.match.params.meetingName;
    const project_id = this.props.match.params.projectId;
    let meeting_id;

    // ------------------------------------------------------ Web RTC 요소 핸들링 ------------------------------------------------------

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

    // host connection
    connection.onstream = function (event) {
      //connection1
      // event.mediaContainer.style.width=""
      connection.videosContainer = document.getElementById("videos-container"); //1개 이상의 비디오들을 담을 div공간을 id값으로 가져온다.
      var video = document.createElement("video"); //비디오 컴포넌트를 생성한다.
      video.id = event.streamid; //각 비디오 화면에 각 스트림의 고유 식별자를 붙인다.
      video.style.width = "100%";
      video.style.height = "100%";

      video.style.border = "solid 2px #6D42F8";

      event.mediaElement.removeAttribute("src");
      event.mediaElement.removeAttribute("srcObject");
      event.mediaElement.muted = true;
      event.mediaElement.volume = 0;

      //FIXME:
      var existing = document.getElementById(event.streamid);
      if (existing && existing.parentNode) {
        existing.parentNode.removeChild(existing);
      }

      try {
        video.setAttributeNode(document.createAttribute("autoplay"));
        video.setAttributeNode(document.createAttribute("playsinline"));
      } catch (e) {
        video.setAttribute("autoplay", true);
        video.setAttribute("playsinline", true);
      }

      if (event.type === "local") {
        video.volume = 0;
        try {
          video.setAttributeNode(document.createAttribute("muted"));
        } catch (e) {
          video.setAttribute("muted", true);
        }
      }

      video.srcObject = event.stream; //비디오에 stream을 연결한다.

      connection.videosContainer.style.width = "100%";
      //var width = 692.78 / 2;
      var width = 650 / 2;

      var mediaElement = service.getHTMLMediaElement(video, {
        //title: event.userid,
        buttons: ["mute-audio", "mute-video"],
        width: width,
        showOnMouseEnter: false,
      });

      // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ RAY @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


      var mediaBox = document.getElementsByClassName("media-box");
      //mediaContainer.setAttribute('style', 'margin-right: 50px;');



      // 라벨 태그를 js로 생성
      var label = document.createElement("div");
      // js로 스타일 지정 ㄷㄷ
      label.setAttribute('style',
      'width:100%; height:20px; padding-top:5px; padding-bottom:5px; background-color:#e9e6fc; color:#6D42F8; border: 2px solid #b6adf3; border-radius:0.5rem; text-align:left; font-size:19px; font-weight:bold;'
      )
      // js로 label 안 요소를 집어 넣는다.
      // <div>
      //    <span id='emotion'></span>
      //    <span id='user_id'>user_id</span>
      // </div>
      label.innerHTML = "<span id='emotion'>&nbsp;/감정/</span> <span id='" + user_id + "'>" + user_id + "</span>"
      mediaElement.appendChild(label);
      // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ RAY @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

      connection.videosContainer.appendChild(mediaElement); //비디오를 div공간에 추가한다.
    };


    // ------------------------------------------------------ Record Audio ------------------------------------------------------
    async function init() {
      await register(await connect());
    }
    init();

    let recorder;
    let user_stream;

    function start_record() {

      navigator.mediaDevices.getUserMedia({ audio: true }).then(
        function (stream) {
          // 스트림 시작시 스트림 저장
          user_stream = stream;

          recorder = new MediaRecorder(stream, { mimeType: 'audio/wav' });
          recorder.start();
          recorder.ondataavailable = function (e) {
            //console.log(e)          // blob event
            //console.log(e.data)     // e.data -> blob 변수. 녹음 결과임

            // 백엔드로 전송하기 위해 FormData로 생성
            var fd = new FormData();
            fd.append("for_librosa", e.data);
            fd.append("for_silence", e.data);
            fd.append('stt_result', stt_result)

            // 잘 생성됐는지 확인
            //for (let key of fd.keys()) {
            //    console.log(key);
            //}
            //for (let value of fd.values()) {
            //    console.log(value);
            //}

            // 파일 전송
            axios({
              method: "post",
              url: 'https://localhost:5000/api/record',
              data: fd,
              headers: { "Content-Type": "multipart/form-data" },
            })/*.then(
              (res) => {
                console.log('결과 : ', res.data.result)
              }
            )*/
          };
        }
      )
    }

    function end_record() {
      if (recorder && recorder.state === "recording") {
        recorder.stop();
        user_stream.getAudioTracks()[0].stop();
      }
    }

    // ------------------------------------------------------ Chrome STT API ------------------------------------------------------

    // 인식 상태를 관리하는 변수들
    var isRecognizing = false;
    var ignoreEndProcess = false;
    var finalTranscript = "";
    let stt_result = '';

    // Chrome STT API 선언
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    var recognition = new window.webkitSpeechRecognition();

    // Chrome STT API 기본 설정
    recognition.continuous = true;          // true 설정 시 계속해서 음성인식
    recognition.interimResults = false;     // true 설정 시 중간결과 반환
    recognition.maxAlternatives = 1;        // 그냥 1로 지정
    recognition.lang = "ko-KR";             // 한국어로 설정

    // STT 시작하면 발동됨
    recognition.onstart = function () {
      isRecognizing = true;
    };

    recognition.onspeechstart = function () {
      start_record();
    }

    // STT 종료시 발동됨
    recognition.onend = function () {
      alert('STT 종료')

      isRecognizing = false;

      if (ignoreEndProcess) {
        return false;
      }
      if (!finalTranscript) {
        return false;
      }
    };

    // STT 결과 처리하는 부분 
    // 크롬에서 자동으로 음성을 감지하여 끝을 내면 그 때 발동된다.
    recognition.onresult = function (event) {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        // 인식된 문장이 끝났을 경우에만 동작
        if (event.results[i].isFinal) {
          // 방금 인식한 단어를 전체 결과에 추가함
          //finalTranscript += event.results[i][0].transcript;
          console.log(' ---------------------------------- 음성감지 => 녹음시작 ---------------------------------- ');

          // 콘솔로 찍어보기
          stt_result = event.results[i][0].transcript
          console.log('방금 인식된 문장 : ', stt_result)

          // 채팅창 업데이트 소켓으로 전송
          client_socket.emit('chat', {
            'user_id' : user_id,
            'stt_result' : stt_result,
          })
        }
      }
      end_record();
      start_record();
    };

    // 에러 처리
    recognition.onerror = function (event) {
      console.log("onerror", event);

      if (event.error.match(/no-speech|audio-capture|not-allowed/)) {
        ignoreEndProcess = true;
      }
    };

    // stt 시작하는 함수
    function start_stt() {
      recognition.start()
      ignoreEndProcess = false;
      finalTranscript = "";
    }

    // stt 종료 함수
    function end_stt() {
      if (isRecognizing) {
        recognition.stop();
        return;
      }
    }

     // ------------------------------------------------------ socket 통신 ------------------------------------------------------

    // 소켓 연결
    let client_socket = socketio.connect('https://localhost:5000')

    // 회의 시작시 알림
    client_socket.on('start_log',
      function (res) {
        alert('회의가 시작되었습니다. 회의록이 생성됩니다.')
        // meeting_id를 저장
        meeting_id = res.meeting_id
        console.log(meeting_id)
        // stt 시작
        start_stt();
      }
    )
    
    // stt 결과 받아주는 소켓
    client_socket.on('chat',
      function (res) {
        console.log(res)
        // 여기서 채팅창 업데이트 해준다
      }
    )

    // 감정결과 받아주는 소켓
    client_socket.on('emotion_result',
      function (res) {
        console.log(res)
        // 여기서 감정 결과 엄데이트 해준다
      }
    )

    // ------------------------------------------------------ Event Handling ------------------------------------------------------

    /*
    if(room_state === 'join'){
      document.getElementById('start_log').style.display = 'none'
      document.getElementById('end_log').style.display = 'none'
    }
    */

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

    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ RAY @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    // 만약 join 한 사람이면 
    // id = 'start_log' 인 태그 (버튼임)을 안보이게 만든다.
    if(room_state === 'join'){
      document.getElementById('start_log').style.display = 'none' ;
    }
    
    //
    document.getElementById('start_log').onclick = function () {
      alert('버튼눌림')
      let year = new Date().getFullYear()
      let month = new Date().getMonth() + 1
      let date = new Date().getDate()
      const meeting_date = year + '-' + month + '-' + date
      // 소켓에 시작신호 + 저장할 데이터 전송
      client_socket.emit("start_log", {
        'meeting_name' : meeting_name,
        'meeting_date' : meeting_date,
        'project_id' : project_id,
      })
    }
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ RAY @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  }

  render() {

    const icon = {
      height: '40px',
    }
    const icon_play = {
      height: '30px',
    }

    return (
      <div>
        <HeaderMeetingRoom />
        

        <div className="left-component">
    
          <ul className="menu-wrap">
            <li><button className="clip-button">🔗코드공유</button></li>
            <li><button className="start-log-button">🚀회의시작</button></li>
            <li><button className="end-log-button">🚨종료하기</button></li>

            <hr color="#b6adf3" noshade="noshade" size="1" />
            <span style={{float:"left"}}>&nbsp;🎥&nbsp;&nbsp;00:00</span><br />
            <hr color="#b6adf3" noshade="noshade" size="1" />

            <p style={{fontWeight:"bold", fontSize:"17px", color:"#6D42F8"}}>[ 회의 분위기 ]</p>
            <span style={{fontSize:"40px"}}>🤩</span><br />
            <hr color="#b6adf3" noshade="noshade" size="1" />

            <p style={{fontWeight:"bold", fontSize:"17px", color:"#6D42F8"}}>[ 참여도 1등 ]</p>
            <span className="menu-rank"> 김홍시 </span><br />
          </ul>

          <div className="videos-container" id="videos-container"/>

        </div>

        <div className="right-component">
          <div className="chatting-title">
            {this.props.match.params.meetingName}
          </div>
          <div className="chatting">

          </div>
        </div>

        <br /><br />
        <button id='start_log'>회의 시작</button>
        
      </div>
    );
  }
}

export default MeetingRoom;