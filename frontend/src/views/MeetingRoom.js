import React, { Component } from 'react';
import socketio from 'socket.io-client';
import axios from "axios";
import { MediaRecorder, register } from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';

import HeaderMeetingRoom from '../components/HeaderMeetingRoom';

import * as service from "./getHTMLMediaElement";
import origin from "../api/origin";

class MeetingRoom extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // ------------------------------------------------------ init ------------------------------------------------------

    let new_props = this.props;

    // url로 코드와 상태 정보를 받아옴.
    const user_id = this.props.match.params.userId
    const room_state = this.props.match.params.roomState;
    const room_code = this.props.match.params.roomCode;
    const meeting_name = this.props.match.params.meetingName;
    const project_id = this.props.match.params.projectId;
    let meeting_id;
    let project_name;

    //
    let mapping_list = []
    let emotion_list = []
    let sum_log_realtime = {}
    let sum_log_len = {}
    let time_capture;
    let now_time;
    let dummy_time;

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

      video.style.border = "solid 2px #9172F6";

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
      //var width = 692.78 / 2;
      var width = 840 / 2;

      // 매핑 리스트에서 label_id를 찾아낸다
      for (let row of mapping_list) {
        if (row[0] === event.userid) {
          label_id = row[1]
        }
      }
      var mediaElement = service.getHTMLMediaElement(video, {
        title: '🙂',
        label_id : label_id,
        buttons: ["mute-audio", "mute-video"],
        width: width,
        showOnMouseEnter: false,
      });

      // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ RAY @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

      var mediaBox = document.getElementsByClassName("media-box");
      //mediaContainer.setAttribute('style', 'margin-right: 50px;');

      // 라벨 태그를 js로 생성
      var labelBox = document.createElement("div");
      labelBox.setAttribute("style", "width:355px; height:30px; padding-left: 8px; padding-right: 20px;");

      var label = document.createElement("div");
      label.setAttribute('style',
        'width:348px; height:20px; float:right; padding-top:5px; padding-bottom:5px; background-color:#e9e6fc; font-family:GmarketSansMedium; color:#6D42F8; border: 2px solid #b6adf3; border-radius:0.5rem; text-align:center; font-size:19px; font-weight:bold;'
      )
      
      // 라벨에 내용 추가
      label.innerHTML = "<span>" + label_id + "</span>"
      labelBox.appendChild(label);
      mediaElement.appendChild(labelBox);

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
              url: `${origin.flask}/record`,
              data: fd,
              headers: {
                'Accept': 'application/json',
                "Content-Type": "multipart/form-data"
              }
            }).then(
              res => { console.log(res) }
            )
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
      time_capture = now_time
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        // 인식된 문장이 끝났을 경우에만 동작
        if (event.results[i].isFinal) {
          console.log(' ---------------------------------- 음성감지 => 녹음시작 ---------------------------------- ');
          // 콘솔로 찍어보기
          stt_result = event.results[i][0].transcript
          console.log('방금 인식된 문장 : ', stt_result)
          // 방금 인식한 단어를 전체 결과에 추가함
          finalTranscript += stt_result;
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
        alert('오류 발생! STT가 종료됩니다.')
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
    let client_socket = socketio.connect(`${origin.socket}`)

    // 참가자 입장시
    client_socket.on('insert_mapping',
      function (res) {
        // 참가자의 id 매핑 리스트는 호스트가 관리
        if (room_state === 'open') {
          // 매핑 리스트에 추가 후 소켓서버를 통해 새 참가자에게 전달
          mapping_list.push([res.stream_id, res.user_id])
          client_socket.emit('pass_mapping', { 'mapping_list': mapping_list })
          console.log('mapping_list 전달')
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

    // ***** 회의 시작시 알림 *****
    client_socket.on('start_log',
      function (res) {
        // 전역변수에 meeting_id/project_name 저장
        meeting_id = res.meeting_id
        project_name = res.project_name
        // 타이머 시작
        start_timer();
        // REC 버튼 변경
        document.getElementById('rec_span').innerHTML = "<button class='Rec'></button>";
        alert('📝 회의가 시작되었습니다! 회의록이 생성됩니다.')
        // stt 시작
        start_stt();
      }
    )

    // ***** 회의 종료시 알림 *****
    client_socket.on('end_log',
      function (res) {
        end_record();
        end_stt();
        clearInterval(dummy_time);
        setTimeout(() =>{
          alert('🚫 회의가 종료되었습니다! 회의록 결과 페이지로 이동합니다. 💨')
          //window.location = '/'+ user_id + '/project/' + project_id + '/' + project_name + '/log/' + meeting_id + '/' + meeting_name;
          let url = '/'+ user_id + '/project/' + project_id + '/' + project_name + '/log/' + meeting_id + '/' + meeting_name;
          new_props.history.push(url)
        }, 5000)
      }
    )
    console.log(new_props)

    // ***** stt 결과 받아주는 소켓 *****
    client_socket.on('chat',
      function (res) {
        console.log('STT 결과 : ', res)
        // 여기서 채팅창 업데이트
        let new_chat_box = document.createElement("div")
        let new_chat = document.createElement("div")
        let new_time = document.createElement("div")
        let new_chat_id = document.createElement("div")
        new_chat_id.className = 'chat_id'
        new_chat_id.innerHTML = res.user_id
        // 내 결과일때
        if(res.user_id === user_id){
          new_chat_box.className = 'local_box'
          new_chat.className = 'local_chat'
          new_time.className = 'local_time'
        }
        // 다른 사람 결과일때
        else{
          new_chat_box.className = 'remote_box'
          new_chat.className = 'remote_chat'
          new_time.className = 'remote_time'
        }
        new_chat.innerHTML = res.stt_result
        new_time.innerHTML = res.log_time
        new_chat_box.append(new_chat_id, new_chat, new_time)

        let chat_el = document.getElementById('chatting')
        chat_el.append(new_chat_box);
        chat_el.scrollTop = chat_el.scrollHeight;
      }
    )

    // ***** 감정결과 받아주는 소켓 *****
    client_socket.on('emotion_result',
      function (res) {
        console.log('emotion 결과 : ', res)
        // 호스트가 모든 결과를 저장해둔다.
        if (room_state === 'open') {
          // 감정 리스트에 추가
          emotion_list.push(res.emotion_result);
          sum_log_realtime[res.user_id] += res.log_realtime;
          sum_log_len[res.user_id] += res.log_text.length;
        }
        // 결과 주인의 이모티콘을 업데이트
        document.getElementById(res.user_id).innerHTML = emotion_emoticon(res.emotion_result);
      }
    )

    // ***** 30초마다 평균감정/참여도순위 받아주는 소켓 *****
    client_socket.on('calculate',
      function (res) {
        console.log('30초결과 : ', res)
        // 여기서 평균감정/참여도순위  업데이트 해준다
        // {avg_emotion, ranking}
        // 평균감정 업데이트
        document.getElementById('avg_emotion_span').innerHTML = emotion_emoticon(res.avg_emotion);
        // 참여도 업데이트
        let rank_result = res.ranking
        document.getElementById('ranking_span').innerHTML = rank_emoticon(rank_result[user_id])
      }
    )

    // ------------------------------------------------------ 기타 함수 ------------------------------------------------------
    function emotion_emoticon(emotion){
      let emoticon;
      if(emotion === 'anger'){ emoticon = '😡' }
      else if(emotion === 'fear'){ emoticon = '😨' }
      else if(emotion === 'happiness'){ emoticon = '😃' }
      else if(emotion === 'neutral'){ emoticon = '🙂' }
      else if(emotion === 'sadness'){ emoticon = '😥' }
      return emoticon;
    }

    function rank_emoticon(user_rank){
      let emoticon;
      if(user_rank === 1){ emoticon = '🥇'}
      else if(user_rank === 2){ emoticon = '🥈'}
      else if(user_rank === 3){ emoticon = '🥉'}
      return emoticon;
    }
    
    function addZero(num) {
      return (num < 10 ? '0' + num : '' + num)
    }

    function start_timer() {
      let start_time = Date.now()
      let now_date, now_min, now_sec;
      dummy_time = setInterval(function () {
        now_date = new Date(Date.now() - start_time)
        // 분/초는 전역 변수로 빼서 사용
        now_min = addZero(now_date.getMinutes())
        now_sec = addZero(now_date.getSeconds())
        now_time = now_min + ':' + now_sec
        document.getElementById('timer').innerText = now_time
        // 30초마다 평균 감정 + 참여도 계산 (호스트가 대표로 보낸다.)
        if (room_state === 'open' && Number(now_sec) % 30 === 0) {
          client_socket.emit("calculate", {
            'meeting_id': meeting_id,
            'time': now_time,
            'emotion_list': emotion_list,
            'sum_log_realtime': sum_log_realtime,
            'sum_log_len': sum_log_len,
          })
          console.log(' @@@@@@@@@@@@@ 30초 경과 : 결과 전송 @@@@@@@@@@@@@')
        }
      }, 1000)
    }

    // ------------------------------------------------------ Event Handling ------------------------------------------------------

    // 회의방 생성시
    if (room_state == 'open') {
      console.log('호스트 입장')
      project_name = this.props.match.params.projectName
      connection.open(room_code);
      document.getElementById('host_btn').style.display = 'block'
    }

    // 회의방 입장시
    else {
      console.log('참가자 입장')
      connection.join(room_code);
    }

    
    // 클립보드 복사하기
    document.getElementById('clip_btn').onclick = function () {
      navigator.clipboard.writeText(room_code).then(
        () => {
          alert('🥕 초대코드가 클립보드에 복사되었습니다 🥕')
        });
    }

    // 회의 시작 버튼 눌렀을때 (호스트에게만 작동)
    document.getElementById('start_log').onclick = function () {
      // 시작 날짜 생성
      let year = new Date().getFullYear()
      let month = new Date().getMonth() + 1
      let date = new Date().getDate()
      const meeting_date = year + '-' + month + '-' + date
      // 호스트가 현재 참가한 사람별로 emotion_list / sum_log_realtime init
      for (let row of mapping_list) {
        sum_log_realtime[row[1]] = 0
        sum_log_len[row[1]] = 0
      }
      // 소켓에 시작신호 + 저장할 데이터 전송
      client_socket.emit("start_log", {
        'meeting_name': meeting_name,
        'meeting_date': meeting_date,
        'project_id': project_id,
        'project_name' : project_name,
      })
      // 회의 관련 버튼 교체
      document.getElementById('start_log').style.backgroundColor  = '#a186fa';
      document.getElementById('start_log').style.pointerEvents = 'none'
      document.getElementById('end_log').style.backgroundColor  = '#6D42F8';
      document.getElementById('end_log').style.pointerEvents = 'auto';
    }

    // 회의 종료 버튼 클릭
    document.getElementById('end_log').onclick = function () {
      // 회의 종료 신호 전송
      client_socket.emit("end_log", {})
      // 버튼 막기
      document.getElementById('end_log').style.backgroundColor  = '#a186fa';
      document.getElementById('end_log').style.pointerEvents = 'none'
    }

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

        <div className="rtcRoom-content">
          <div className="left-component">
            <ul className="menu-wrap">
              
              <div className='rec_timer'>
                <span id='rec_span'>&nbsp;🎥&nbsp;</span>
                <span id='timer'>00:00</span>
                <hr color="#b6adf3" noshade="noshade" size="1" />
              </div>

              <br/>

              <li><button id='clip_btn' className="clip-button">🔗 코드공유</button></li>
              <div id='host_btn' style={{ display: 'none' }}>
                <li><button id='start_log' className="start-log-button">🚀 회의시작</button></li>
                <li><button id='end_log' className="end-log-button">🚨 종료하기</button></li>
              </div>
              <hr color="#b6adf3" noshade="noshade" size="1" />
              
              <div className="menu-bottom">
              <p style={{ fontFamily: 'GmarketSansMedium', fontWeight: "bold", fontSize: "16px", color: "#6D42F8" }}> [ 회의 분위기 ] </p>
              <span id='avg_emotion_span' style={{ fontSize: "40px" }}>❔</span>
              <br />
              <hr color="#b6adf3" noshade="noshade" size="1" />

              <p style={{ fontFamily: 'GmarketSansMedium', fontWeight: "bold", fontSize: "16px", color: "#6D42F8" }}>[ 내 참여도 순위 ]</p>
              {/*<span className="menu-rank"> 김홍시 </span><br />*/}
              <span id='ranking_span' style={{ fontSize: "40px" }}>❔</span><br />
              </div>
            </ul>

            <div className="videos-container" id="videos-container" />

          </div>

          <div className="right-component">
            <div className="chatting-title">
              회의명 : {this.props.match.params.meetingName}
            </div>

            <div className="chatting" id="chatting">

            </div>
            

            <div className="emotion-guide-title">
              <span style={{ fontFamily: 'GmarketSansMedium', fontWeight: "bold", fontSize: "20px", color: "#6D42F8" }}>[ 감정 가이드 ]</span>
              <hr color="#D8D5EB" noshade="noshade" size="1.5" />
              <div className="emotion-guide">
                <span style={{ fontSize: "18px" }}>😃</span> <span style={{ fontFamily: 'GmarketSansMedium', fontSize: "18px", backgroundColor: "#FFFF85" }}>기쁨</span>
                <span style={{ fontSize: "18px" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🙂</span> <span style={{ fontFamily: 'GmarketSansMedium', fontSize: "18px", backgroundColor: "#E3E0EC" }}>평범</span>
                <span style={{ fontSize: "18px" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;😨</span> <span style={{ fontFamily: 'GmarketSansMedium', fontSize: "18px", backgroundColor: "#B3EBD8" }}>긴장</span><br />

                <span style={{ fontSize: "18px" }}>😥</span> <span style={{ fontFamily: 'GmarketSansMedium', fontSize: "18px", backgroundColor: "#95BEEF" }}>슬픔</span>
                <span style={{ fontSize: "18px" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;😡</span> <span style={{ fontFamily: 'GmarketSansMedium', fontSize: "18px", backgroundColor: "#FFB7DD" }}>화남</span>
              </div>
            </div>
          </div>
        </div>
        <br /><br />
      </div>
    );
  }
}

export default MeetingRoom;