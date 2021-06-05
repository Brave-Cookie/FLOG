import React, { Component } from 'react';
import socketio from 'socket.io-client';
import { MediaRecorder, register } from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';
import axios from "axios";

class Demo extends Component {

    componentDidMount() {
        /*
        // ------------------------------------------------------ Record Audio ------------------------------------------------------
        async function init(){
            await register(await connect());
        }
        init();

        let recorder;
        let user_stream;

        function start_record(){
            //console.log(' ---------------------------------- 음성감지 => 녹음시작 ---------------------------------- ');

            navigator.mediaDevices.getUserMedia({ audio: true }).then(
                function(stream){
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
                            url: 'http://localhost:5000/api/record',
                            data: fd,
                            headers: { "Content-Type": "multipart/form-data" },
                        }).then(
                            (res) => {
                                console.log('결과 : ', res.data.result)
                            }
                        )
                    };
                }
            )
        }

        function end_record(){
            //console.log(' ---------------------------------- 음성끝 => 녹음끝 ----------------------------------')
            if (recorder && recorder.state === "recording"){
                recorder.stop();
                user_stream.getAudioTracks()[0].stop();
            }
        }

        

        // ------------------------------------------------------ Chrome STT API ------------------------------------------------------

        // 인식 상태를 관리하는 변수들
        var isRecognizing = false;
        var ignoreEndProcess = false;
        var finalTranscript = "";

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


        recognition.onspeechstart = function() {
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

        // ------------------------------------------------------ Event------------------------------------------------------

        let socket;
    
        // 시작버튼 click 이벤트
        document.getElementById('connect_socket').onclick = function () {
            if(socket !== undefined){
                alert('이미 연결되었음.')
            }
            
            else{
                // 첫 소켓 연결 + STT 시작
                socket = socketio.connect('http://localhost:5000')
                alert('소켓 연결됨! Flask 콘솔 확인')
                start_stt();

                // 소켓에서 res 리스닝하는 부분 (socket.on)
                socket.on('connect_res',  function(res){
                    console.log(res)
                })
            }
        }

        // ------------------------------------------------------ temp ------------------------------------------------------

        document.getElementById('start_stt').onclick = function () {
            start_stt();
        }
        document.getElementById('end_stt').onclick = function () {
            end_stt();
        }
        */

    }



  render() {

    return (
        <div>
            <p> ddd </p>

        </div>
    );
  }
}

export default Demo;
