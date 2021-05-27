# -*- conding: utf-8 -*-
from flask import Flask, render_template, redirect, url_for, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from model import *

# flask app에 라이브러리 설정하기
app = Flask(__name__)
# CORS 설정
CORS(app)

# DB 연동하는 부분
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "mysql+pymysql://root:11111111@flogdb.csbcfamkafav.ap-northeast-2.rds.amazonaws.com:3306/flog"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# localhost:5000 으로 접속

# ---------------------------------------------------------- 테스트 ----------------------------------------------------------
@app.route("/")
def index():
    return render_template("index.html")


# 테스트 페이지 url 설정
@app.route("/count")
def fc():
    ui = UserInfo.query.all()

    for row in ui:
        print(row.user_id)

    return redirect(url_for("index"))


# ---------------------------------------------------------- Socket.io ----------------------------------------------------------

from flask_socketio import SocketIO

# 소켓 객체 생성
socketio = SocketIO(app, cors_allowed_origins="*")


@socketio.on("connect")
def connect():
    print("@@@@@@@@@@@@@@@@ 소켓 연결됨 @@@@@@@@@@@@@@@@")
    socketio.emit("connect_res", {"msg": "연결완료"})


@socketio.on("dummy")
def dummy(req):
    print(req)
    # 응답 보내기
    socketio.emit("dummy", {"msg": "더미 응답"})


@socketio.on("disconnect")
def disconnect():
    print("@@@@@@@@@@@@@@@ 소켓 연결중단 @@@@@@@@@@@@@@@")


# ---------------------------------------------------------- Rest API URL ----------------------------------------------------------

# 설명
@app.route("/api/test", methods=["POST"])
def test():
    print("요청 잘 왔어요!!!")
    return jsonify({"message": "요청테스트"})


import librosa
import joblib
import numpy as np
from pydub import AudioSegment, silence

# pkl 파일 load
clf_from_joblib = joblib.load("./pkl/model.pkl")
scaler_from_joblib = joblib.load("./pkl/scaler.pkl")

# 감정분석 함수
def emotion_recognition(audio_len, reform_signal, sr):
    global clf_from_joblib, scaler_from_joblib
    emotions = []
    for i in range(0, audio_len - 3):
        # 0~4 / 1~5 /.... 슬라이스
        sliced_signal = reform_signal[i * 16000 : (i + 4) * 16000]
        # 음성 전처리 실시
        mfcc = librosa.feature.mfcc(
            sliced_signal, sr, n_fft=400, hop_length=160, n_mfcc=36
        )
        mfcc = mfcc.reshape(-1)
        mfcc = scaler_from_joblib.transform([mfcc])
        print(mfcc)
        # 감정분석 결과 추출
        result = clf_from_joblib.predict(mfcc)
        if result[0] == 0:
            emotion = "anger"
        elif result[0] == 1:
            emotion = "fear"
        elif result[0] == 2:
            emotion = "happy"
        elif result[0] == 3:
            emotion = "neutral"
        elif result[0] == 4:
            emotion = "sad"
        emotions.append(emotion)
    print(emotions)
    return max(emotions, key=emotions.count)


# 음성데이터 요청 응답
@app.route("/api/record", methods=["POST"])
def record():
    print(
        "-------------------------------------- 요청완료 => 분석시작 --------------------------------------"
    )

    # 넘어온 wav 음성 데이터
    fs = request.files["for_silence"]
    f = request.files["for_librosa"]

    # librosa 변환
    signal, sr = librosa.load(f, sr=16000)

    # 묵음감지 전 길이 측정
    if int(librosa.get_duration(signal, sr)) < 4:
        print(" XXXXXXXXXXX 4초 미만 음성 XXXXXXXXXXX ")
        return jsonify({"message": "4초 미만 음성"})

    # 묵음구간 추출
    myaudio = AudioSegment.from_wav(fs)
    dBFS = myaudio.dBFS
    silence_section = silence.detect_silence(
        myaudio, min_silence_len=1000, silence_thresh=dBFS - 16
    )
    silence_section = [
        ((start / 1000), (stop / 1000)) for start, stop in silence_section
    ]
    print(silence_section)

    # 묵음 구간을 없앤 실제 음성 구간 파싱
    section_list = []
    for start, end in silence_section:
        section_list.extend([start, end])
    section_list = section_list[1:-1]

    # 실제 음성 구간에서 2개씩 묶어준다.
    new_section = []
    for i, section in enumerate(section_list):
        if i % 2 == 0:
            new_section.append([section, section_list[i + 1]])
    print(signal)

    # 실제 음성 구간을 추출, 모두 합쳐줌
    reform_signal = []
    for start, end in new_section:
        reform_signal.extend(signal[int(start * 16000) : int(end * 16000)])
    reform_signal = np.array(reform_signal)

    # 묵음제거 음성 길이 측정
    audio_len = int(librosa.get_duration(reform_signal, sr))
    print(audio_len)

    if audio_len < 4:
        print(" XXXXXXXXXXX 묵음제거 후 4초 미만 XXXXXXXXXXX ")
        return jsonify({"message": "묵음제거 후 4초 미만"})

    else:
        emotion_result = emotion_recognition(audio_len, reform_signal, sr)
        print(emotion_result)
        return jsonify({"msg": "분석완료"})


# 설명
@app.route("/api/log/wordcloud/<int:meeting_id>")
def wordcloud(meeting_id):
    print("0")
    try:
        import jpype
        import jpype1

        print("1")

    except:
        import jpype

        print("2")
    from konlpy.tag import Okt
    from collections import Counter
    from wordcloud import WordCloud

    li = LogInfo.query.all()
    text = ""

    # for로 모두 출력
    for row in li:
        if row.meeting_id == meeting_id:
            text = text + row.log_text + "\n"
    okt = Okt()
    noun = okt.nouns(text)

    count = Counter(noun)

    # 명사빈도 카운트 most_common(뽑아주고 싶은 단어의 갯수)
    noun_list = count.most_common(15)

    print(noun_list)
    return jsonify({"message": "워드클라우드 단어리스트 보내기"}, noun_list)


@app.route("/api/log/summary/<int:meeting_id>")
def summary(meeting_id):
    print("sss")
    print("미팅아이디", meeting_id)
    li = LogInfo.query.all()
    text = ""
    # for로 모두 출력
    for row in li:
        if row.meeting_id == (meeting_id):
            text = text + row.log_text + "." + "\n"

    print("성공전", text)
    from gensim.summarization.summarizer import summarize

    summary_text = summarize(text, ratio=0.1)

    print("요약회의록 전송 성공")
    print(summary_text)
    print("111_")
    return jsonify({"message": "서머리테스트"}, summary_text)


@app.route("/api/log/feelingCount/<int:meeting_id>")
def feeling_count(meeting_id):

    from collections import Counter

    li = LogInfo.query.all()
    feeling = []
    # for로 모두 출력
    for row in li:
        if row.meeting_id == (meeting_id):
            feeling.append(row.log_feeling)
    feeling_frq = (Counter(feeling)).most_common()

    print(feeling_frq)
    return jsonify({"message": "감정 빈도수"}, feeling_frq)


# ---------------------------------------------------------- 서버 시작 ----------------------------------------------------------

# flask 서버를 5000번 포트로 구동
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True, ssl_context=('./https/certificate.pem', './https/privatekey.pem'))
    socketio.run(app, debug=True)