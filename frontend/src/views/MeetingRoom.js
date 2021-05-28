import React, { Component } from 'react';
import socketio from 'socket.io-client';
import axios from "axios";
import { MediaRecorder, register } from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';

import HeaderMeetingRoom from '../components/HeaderMeetingRoom';

// 여기가 전역 변수인가봄
var connection = new window.RTCMultiConnection();
connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

class MeetingRoom extends Component {

  componentDidMount() {
    // ------------------------------------------------------ 입장시 초기 선언 ------------------------------------------------------

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
      alert('STT 시작')
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
      end_record();
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        // 인식된 문장이 끝났을 경우에만 동작
        if (event.results[i].isFinal) {
          // 방금 인식한 단어를 전체 결과에 추가함
          finalTranscript += event.results[i][0].transcript;
          console.log(' ---------------------------------- 음성감지 => 녹음시작 ---------------------------------- ');

          // 콘솔로 찍어보기
          console.log('방금 인식된 문장 : ', event.results[i][0].transcript)
          //console.log('쌓인 문장들 : ', finalTranscript)
        }
      }
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

    // 회의 시작시
    client_socket.on('start_log',
      function (res) {
        start_stt();
        console.log(res)
      }
    )

    // 감정결과
    client_socket.on('emotion_result',
      function (res) {
        console.log(res)
      }
    )

    // ------------------------------------------------------ Event Handling ------------------------------------------------------

    document.getElementById('start_log').onclick = function () {
      client_socket.emit("start_log", {})
    }

  }

  render() {

    // ------------------------------------------------------ Web RTC 요소 핸들링 ------------------------------------------------------

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
      /*
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

      video.style.width = "50px";
      video.style.height = "30px";
      //video.style.border = "solid 1px var(--greenish-teal)";

      event.mediaElement.removeAttribute("src");
      event.mediaElement.removeAttribute("srcObject");

      video.srcObject = event.stream; //비디오에 stream을 연결한다.

      //connection.videosContainer.style.width = "100%";

      connection.videosContainer.appendChild(event.mediaElement); //비디오를 div공간에 추가
      //document.videosContainer.appendChild(event.mediaElement);
      
      //document.getElementById("videos-container").appendChild(event.mediaElement);
      */
      document.body.appendChild(event.mediaElement);
    };

    return (
      <div>
        <HeaderMeetingRoom />

        <div className="left-component">
          <div className="video-box">
            <div className="videos-container" id="videos-container" />
          </div>
        </div>

        <br /><br />
        <button id='start_log'>회의 시작</button>
        <button id='end_log'>회의 종료</button>

      </div>
    );
  }
}

export default MeetingRoom;