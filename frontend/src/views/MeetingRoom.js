import React, { Component } from 'react';
import socketio from 'socket.io-client';
import axios from "axios";
import { MediaRecorder, register } from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';

import HeaderMeetingRoom from '../components/HeaderMeetingRoom';
import clipbord from '../assets/image/clipboard.png';
import start from '../assets/image/startMeeting.png';
import stream from '../assets/image/onStream.png';

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

    //
    let mapping_list = []
    let emotion_list = {}
    let sum_log_realtime = {}
    let time_capture;
    let now_min;
    let now_sec;

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

    // 스트림 연결되면 발동
    connection.onstream = function (event) {

      connection.videosContainer = document.getElementById("videos-container"); //1개 이상의 비디오들을 담을 div공간을 id값으로 가져온다.
      var video = document.createElement("video"); //비디오 컴포넌트를 생성한다.
      video.id = event.streamid; //각 비디오 화면에 각 스트림의 고유 식별자를 붙인다.
      video.style.width = "100%";
      video.style.height = "100%";

      video.style.border = "solid 1px var(--greenish-teal)";

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

      // 내가 새 참가자일때
      let label_id;
      if (event.type === "local") {
        // 내가 새로운 참가자일땐 label_id를 일단 넣어준다.
        // (flask socket이 더 느릴때도 있어서 라벨쪽에서 mapping_list가 비어있을 수 있음)
        label_id = user_id

        // 소켓으로 새 참여자 정보 보내기
        client_socket.emit('insert_mapping', {
          'stream_id': event.userid,
          'user_id': user_id,
        })

        video.volume = 0;
        try {
          video.setAttributeNode(document.createAttribute("muted"));
        } catch (e) {
          video.setAttribute("muted", true);
        }
      }

      video.srcObject = event.stream; //비디오에 stream을 연결한다.

      connection.videosContainer.style.width = "100%";
      var width = 692.78 / 2;

      var mediaElement = service.getHTMLMediaElement(video, {
        title: event.userid,
        buttons: ["mute-audio", "mute-video"],
        width: width,
        showOnMouseEnter: false
      });

      // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ RAY @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      // 라벨 태그를 js로 생성
      var label = document.createElement("div");
      // js로 스타일 지정 ㄷㄷ
      label.setAttribute('style',
        'width:100%; height:50px; background-color:white'
      )
      // js로 label 안 요소를 집어 넣는다.
      // <div>
      //    <span id='emotion'></span>
      //    <span id='user_id'>user_id</span>
      // </div>

      // 매핑 리스트에서 label_id를 찾아낸다
      for (let row of mapping_list) {
        if (row[0] === event.userid) {
          label_id = row[1]
        }
      }
      label.innerHTML = "<span id='" + label_id + "'>" + label_id + "</span>"
      mediaElement.appendChild(label)
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
            // 음성 데이터 저장
            fd.append("for_librosa", e.data);
            fd.append("for_silence", e.data);
            // 텍스트 데이터 저장
            let context = {
              'meeting_id': meeting_id,
              'user_id': user_id,
              'log_time': time_capture,
              'log_text': stt_result,
            }
            fd.append("log_info_row", JSON.stringify(context))

            //잘 생성됐는지 확인
            // for (let key of fd.keys()) {
            //     console.log(key);
            // }
            // for (let value of fd.values()) {
            //     console.log(value);
            // }

            // 파일 전송
            axios({
              method: "post",
              url: 'https://localhost:5000/api/record',
              data: fd,
              headers: {
                'Accept': 'application/json',
                "Content-Type": "multipart/form-data"
              },
            })

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
    // STT 시작 후 첫 발언부터 녹음 시작
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
      time_capture = now_min + ':' + now_sec
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
            'user_id': user_id,
            'stt_result': stt_result,
            'log_time': time_capture,
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

    // 참가자 입장시
    client_socket.on('insert_mapping',
      function (res) {
        // 참가자의 id 매핑 리스트는 호스트가 관리
        if (room_state === 'open') {
          // 매핑 리스트에 추가 후 소켓서버를 통해 새 참가자에게 전달
          mapping_list.push([res.stream_id, res.user_id])
          client_socket.emit('pass_mapping', { 'mapping_list': mapping_list })
          console.log('호스트가 받음')
        }
      }
    )

    // 모든 client의 매핑 리스트 업데이트
    client_socket.on('pass_mapping',
      function (res) {
        mapping_list = res.mapping_list
        console.log(mapping_list)
      }
    )

    // ** 회의 시작시 알림 **
    client_socket.on('start_log',
      function (res) {
        // 타이머 시작
        start_timer();
        alert('회의가 시작되었습니다. 회의록이 생성됩니다.')
        // 전역변수에 meeting_id를 저장
        meeting_id = res.meeting_id
        // stt 시작
        start_stt();
      }
    )

    // stt 결과 받아주는 소켓
    client_socket.on('chat',
      function (res) {
        console.log(res)
        // 여기서 채팅창 업데이트 해준다
        // {user_id, stt_result, log_time}
      }
    )

    // 감정결과 받아주는 소켓
    client_socket.on('emotion_result',
      function (res) {
        // 호스트가 모든 결과를 저장해둔다.
        if(room_state === 'open'){
          
        }
        
        // 여기서 감정 결과 업데이트 해준다
        // {user_id, emotion_result, audio_len}
      }
    )

    // ------------------------------------------------------ 기타 함수 ------------------------------------------------------
    function addZero(num) {
      return (num < 10 ? '0' + num : '' + num)
    }

    function start_timer() {
      let start_time = Date.now()
      let dummy_time;
      let now_time;
      dummy_time = setInterval(function () {
        now_time = new Date(Date.now() - start_time)
        // 분/초는 전역 변수로 빼서 사용
        now_min = addZero(now_time.getMinutes())
        now_sec = addZero(now_time.getSeconds())
        document.getElementById('min').innerText = now_min
        document.getElementById('sec').innerText = now_sec
        // 30초마다 평균 감정 + 참여도 계산 (호스트가 대표로 보낸다.)
        if(room_state === 'open' && Number(now_sec) % 30 === 0){
          client_socket.emit("calculate", {
            'emotion_list': emotion_list,
            'sum_log_realtime': sum_log_realtime,
          })
        }
      }, 1000)
    }

    

    // ------------------------------------------------------ Event Handling ------------------------------------------------------
    /*
    if(room_state === 'join'){
      document.getElementById('start_log').style.display = 'none'
      document.getElementById('end_log').style.display = 'none'
    }
    */

    // 회의방 생성시
    if (room_state == 'open') {
      console.log('호스트 입장')
      connection.open(room_code);
    }
    // 회의방 입장시
    else {
      console.log('참가자 입장')
      connection.join(room_code);
    }

    // 30초마다 

    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ RAY @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    // 만약 join 한 사람이면 
    // id = 'start_log' 인 태그 (버튼임)을 안보이게 만든다.
    if (room_state === 'join') {
      document.getElementById('host_btn').style.display = 'none';
    }

    // 회의 시작 버튼 눌렀을때 (호스트에게만 작동)
    document.getElementById('start_log').onclick = function () {
      // 시작 날짜 생성
      let year = new Date().getFullYear()
      let month = new Date().getMonth() + 1
      let date = new Date().getDate()
      const meeting_date = year + '-' + month + '-' + date
      // 호스트가 현재 참가한 사람별로 emotion_list / sum_log_realtime init
      
      // 소켓에 시작신호 + 저장할 데이터 전송
      client_socket.emit("start_log", {
        'meeting_name': meeting_name,
        'meeting_date': meeting_date,
        'project_id': project_id,
      })
      // 버튼 교체
      document.getElementById('start_log').disabled = true;
      document.getElementById('end_log').disabled = false;
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

          <div className="menu-icon">
            <img src={clipbord} style={icon}></img>
            <img src={start} style={icon_play}></img>
            <img src={stream} style={icon_play}></img>
          </div>
          <ul className="menu-wrap">
            <li><button>코드공유</button></li>
            <li><button>회의 시작</button></li>
            <li><button>종료하기</button></li>
          </ul>

          <div className="videos-container" id="videos-container" />

        </div>

        <br /><br />

        <div id='host_btn'>
          <button id='start_log'>회의 시작</button>
          <button id='end_log' disabled>회의 종료</button>
        </div>

        <span id='min'>00</span> : <span id='sec'>00</span>
      </div>
    );
  }
}

export default MeetingRoom;