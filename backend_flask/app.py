# -*- conding: utf-8 -*-
from flask import Flask, render_template, redirect, url_for, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
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

@socketio.on("insert_mapping")
def insert_mapping(req):
    # 새로 온 참가자 id 매핑 정보를 호스트에게 줌
    socketio.emit("insert_mapping", {
        'stream_id' : req['stream_id'],
        'user_id' : req['user_id'],
        })

@socketio.on("pass_mapping")
def insert_mapping(req):
    # 호스트에게 받은 매핑 리스트를 새 참가자에게 전달
    socketio.emit("pass_mapping", {
        'mapping_list' : req['mapping_list']
        })
    
@socketio.on("start_log")
def start_log(req):
    print(' ---------------- 회의 시작 요청 ---------------- ')

    # meeting_info 마지막 인덱스 추출
    new_m_id = db.session.query(func.max(MeetingInfo.meeting_id)).scalar() + 1

    # meeting_info 삽입
    query1 = MeetingInfo(
        meeting_id = new_m_id,
        meeting_name = req['meeting_name'], 
        meeting_date = req['meeting_date']
        )
    db.session.add(query1)
    db.session.commit()
    print('meeting_info 삽입')

    # project_meeting 매핑 삽입
    query2 = ProjectMeeting(
        meeting_id = new_m_id,
        project_id = req['project_id']
    )
    db.session.add(query2)
    db.session.commit()
    print('project_meeting 삽입')

    db.session.close()
    # meeting_id를 보내준다.
    socketio.emit("start_log", {
        'meeting_id' : new_m_id,
        'project_name' : req['project_name'],
        })

@socketio.on("end_log")
def end_log(req):
    # 호스트의 종료 신호를 받고 모두에게 뿌려줌
    socketio.emit("end_log", {})

@socketio.on("chat")
def start_log(req):
    # 각 참가자의 stt 결과를 받고 그대로 모두에게 뿌려준다 
    socketio.emit("chat", {
            'user_id' : req['user_id'],
            'stt_result' : req['stt_result'],
            'log_time' : req['log_time'],
        })

@socketio.on("calculate")
def calculate(req):
    # {meeting_id time emotion_list sum_log_realtime sum_log_len}
    emotion_list = req['emotion_list']
    sum_log_realtime = req['sum_log_realtime']
    sum_log_len = req['sum_log_realtime']
    # 평균 감정
    avg_emotion = max(emotion_list, key=emotion_list.count)
    # 참여도 산정
    sum_dict = {}

    print(sum_log_realtime)
    print(sum_log_len)

    # 음성길이 + stt 길이를 더한걸 sum_dict에 저장
    for user_id in sum_log_realtime.keys():
        sum_dict[user_id] = sum_log_realtime[user_id] + sum_log_len[user_id]
    # sum_dict에서 수치가 가장 높은 user_id 추출
    sum_list = sorted(sum_dict.items(), key=lambda x: x[1], reverse=True)
    ranking = {}
    for i, row in enumerate(sum_list):
        ranking[row[0]] = i+1
    # avg_emotion 테이블에 저장
    query = AvgEmotion(
        meeting_id = req['meeting_id'],
        time = req['time'],
        emotion = avg_emotion,
        )
    db.session.add(query)
    db.session.commit()
    db.session.close()
    #
    print(" **************** 30초 경과! **************** ")
    print('평균 감정 : ', avg_emotion, ' / 참여도 랭킹 : ', ranking)
    print(" ******************************************* ")
    socketio.emit("calculate", {
        'avg_emotion' : avg_emotion,
        'ranking' : ranking,
    })

@socketio.on("disconnect")
def disconnect():
    print("@@@@@@@@@@@@@@@ 소켓 연결중단 @@@@@@@@@@@@@@@")


# ---------------------------------------------------------- Rest API URL ----------------------------------------------------------

# 설명
@app.route("/api/test", methods=["POST"])
def test():
    print("요청 잘 왔어요!!!")
    return jsonify({"message": "요청테스트"})

import json
import librosa
import joblib
import numpy as np
from pydub import AudioSegment, silence

# pkl 파일 load
clf_from_joblib = joblib.load("./pkl/model.pkl")
scaler_from_joblib = joblib.load("./pkl/scaler.pkl")

# 음성 전처리 함수
def preprocess_audio(f, fs):
    # librosa 변환
    signal, sr = librosa.load(f, 16000)

    # 묵음구간 추출
    myaudio = AudioSegment.from_wav(fs)
    dBFS = myaudio.dBFS
    silence_section = silence.detect_silence(
        myaudio, min_silence_len=1000, silence_thresh=dBFS - 16
    )
    silence_section = [
        ((start / 1000), (stop / 1000)) for start, stop in silence_section
    ]

    #print('묵음 구간!!!', silence_section)

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

    print('음성데이터 전처리 결과 : ', signal)

    # 실제 음성 구간을 추출, 모두 합쳐줌
    reform_signal = []
    for start, end in new_section:
        reform_signal.extend(signal[int(start * 16000) : int(end * 16000)])
    reform_signal = np.array(reform_signal)

    # 묵음제거 음성 길이 측정
    audio_len = int(librosa.get_duration(reform_signal, sr))
    return audio_len, reform_signal


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
            emotion = "happiness"
        elif result[0] == 3:
            emotion = "neutral"
        elif result[0] == 4:
            emotion = "sadness"
        emotions.append(emotion)
    print(emotions)
    return max(emotions, key=emotions.count)


# 음성데이터 요청 응답
@app.route("/api/record", methods=["POST"])
def record():
    print( "-------------------------------------- 음성감지 => 분석시작 --------------------------------------")

    # 넘어온 wav 음성 데이터
    fs = request.files["for_silence"]
    f = request.files["for_librosa"]
    # 넘어온 회의정보 텍스트 데이터
    log_info_row = json.loads(request.form['log_info_row'])
    #print(log_info_row['meeting_id'])

    # 음성 전처리 + 묵음 제거
    audio_len, reform_signal = preprocess_audio(f, fs)
    #print('audio_len : ', audio_len)

    # 감정 분석하기
    emotion_result = ''
    if audio_len < 4:
        print(" XXXXXXXXXXX 묵음제거 후 4초 미만 XXXXXXXXXXX ")
        emotion_result = 'neutral'
    else:
        emotion_result = emotion_recognition(audio_len, reform_signal, 16000)

    print( "------------------------------------------------------------------------------------------------")
    print('>>> 최종 음성 길이 : ( ', audio_len, ' )')
    print('>>> 최종 감정분석 결과 : ( ', emotion_result, ' )')
    print( "------------------------------------------------------------------------------------------------")


    # 유저의 감정 분석 결과를 뿌려줌
    socketio.emit("emotion_result", {
        'user_id' : log_info_row['user_id'],
        'log_text' : log_info_row['log_text'],
        "emotion_result": emotion_result,
        "log_realtime": audio_len
        })

    # 최종 결과는 log_info에 한 row로 저장
    query = LogInfo(
        meeting_id = log_info_row['meeting_id'],
        user_id = log_info_row['user_id'],
        log_time = log_info_row['log_time'],
        log_feeling = emotion_result,
        log_text = log_info_row['log_text'],
        log_realtime = audio_len,
        )
    db.session.add(query)
    db.session.commit()
    db.session.close()
    #print('log_info에 row 삽입완료')
    return jsonify({"message": "log_info에 row 삽입완료"})

# 설명
@app.route("/api/log/wordcloud/<int:meeting_id>")
def wordcloud(meeting_id):
    ''' 오류로 막아둠
    try:
        import jpype
        import jpype1
    except:
        import jpype

    #import jpype1
    #import jpype
    from konlpy.tag import Okt
    

    li = LogInfo.query.all()
    text = ""
    # for로 모두 출력
    for row in li:
        if row.meeting_id == meeting_id:
            text = text + row.log_text + "\n"

    if jpype.isJVMStarted():
	    jpype.attachThreadToJVM()
    okt = Okt()
    noun = okt.nouns(text)

    count = Counter(noun)
    # 명사빈도 카운트 most_common(뽑아주고 싶은 단어의 갯수)
    noun_list = count.most_common(15)

    print(noun_list)
    #noun_list = [('부분', 14), ('진행', 8), ('구현', 8), ('프론트엔드', 7), ('백엔드', 7), ('뷰', 7), ('프로젝트', 6), ('프레임워크', 6), ('저', 6), ('기능', 6), ('화상회의', 4), ('제', 4), ('일단', 4), ('요', 4), ('지금', 4)]
    
    return jsonify({"message": "워드클라우드 단어리스트 보내기"}, noun_list)
    '''
    return jsonify({"message": "서버 오류"}, [('서버',2), ('오류',1)])


from gensim.summarization.summarizer import summarize

@app.route("/api/log/summary/<int:meeting_id>")
def summary(meeting_id):
    li = db.session.query(LogInfo).all()
    text = ""
    # for로 모두 출력
    for row in li:
        if row.meeting_id == (meeting_id):
            text = text + row.log_text + "." + "\n"
    summary_text = summarize(text, ratio=0.1)

    print("요약회의록 전송 성공")
    db.session.close()
    return jsonify({"message": "서머리테스트"}, summary_text)


from collections import Counter

@app.route("/api/log/feelingCount/<int:meeting_id>")
def feeling_count(meeting_id):
    li = db.session.query(LogInfo).all()
    feeling = []
    # for로 모두 출력
    for row in li:
        if row.meeting_id == (meeting_id):
            feeling.append(row.log_feeling)
    feeling_frq = (Counter(feeling)).most_common()

    print(feeling_frq)
    db.session.close()
    return jsonify({"message": "감정 빈도수"}, feeling_frq)


# ---------------------------------------------------------- 서버 시작 ----------------------------------------------------------

# flask 서버를 5000번 포트로 구동
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
    #app.run(host='0.0.0.0', port=5000, debug=True, ssl_context=('./https/certificate.pem', './https/privatekey.pem'))
    socketio.run(app, debug=True)