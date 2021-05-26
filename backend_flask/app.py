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

# ---------------------------------------- 처음 index page 시작 ----------------------------------------
@app.route("/")
def index():
    return render_template("index.html")


# ---------------------------------------- 테스트 ----------------------------------------


# ----------------------------------- REST API URL ----------------------------------------


# -----------------------------
@app.route("/api/test", methods=["POST"])
def test():
    print("요청 잘 왔어요!!!")
    return jsonify({"message": "요청테스트"})


@app.route("/api/log/wordcloud/<int:meeting_id>")
def wordcloud():
    li = LogInfo.query.all()
    text = ""

    # for로 모두 출력
    for row in li:
        if row.meeting_id == 1:
            text = text + row.log_text + "\n"

    try:
        import jpype
        import jpype1

        print("1")
    except:
        import jpype

        print(2)
    from konlpy.tag import Okt
    from collections import Counter
    from wordcloud import WordCloud
    import matplotlib.pyplot as plt

    okt = Okt()
    noun = okt.nouns(text)

    count = Counter(noun)

    # 명사빈도 카운트 most_common(뽑아주고 싶은 단어의 갯수)
    noun_list = count.most_common(10)
    # print('제일 많이 나온단어:',noun_list)
    # wc = WordCloud(font_path ='C:\Jeonbar2\git_workspace\Brave_cookie\Before_Dev\jeonbar2\BMDOHYEON_ttf.ttf',background_color="white",width=1000,
    # height=1000,
    # max_words=100,max_font_size=300)
    # wc.generate_from_frequencies(dict(noun_list))
    # wc.to_file('keyword.jpg')

    print(noun_list)
    return jsonify({"message": "워드클라우드 단어리스트 보내기"}, noun_list)


# -----------------------------------------------


# flask 서버를 5000번 포트로 구동
if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)


"""

app.config.from_pyfile("config.py")
app.config['SQLALCHEMY_DATABASE_URL'] = config.DB_URL
database= create_engine(app.config['DB_URL'], encoding = 'utf-8', max_overflow = 0)
app.database = database

connection = database.connect()
metadata = sqlalchemy.MetaData()

table = sqlalchemy.Table('user_info',metadata,autoload=True,autoload_with=database)


print(table.columns.keys())

query = sqlalchemy.select([table])

# 이때 query의 내용을 출력해보면 sql query인 것을 알 수 있음
print(query)
result_proxy = connection.execute(query)
result_set = result_proxy.fetchall()

query = sqlalchemy.insert(table).values(user_id='내가',user_pw='이걸',user_email='했네',user_name='s') # 이때 values는 table의 column의 순서와 갯수가 일치해야 함
result_proxy = connection.execute(query)
result_proxy.close()
# 쿼리 실행

# 결과 print 이때 10개만 출력하도록 함. 단순한 set 자료구조의 형태를 하고 있음.
print(result_set)
@app.route("/")


def hello():
    print()
    return "z"

"""
