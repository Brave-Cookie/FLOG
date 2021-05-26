FROM ubuntu:latest

ENV LANG=C.UTF-8
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && \
  apt-get install -y --no-install-recommends tzdata g++ curl

# install java
RUN apt-get install -y openjdk-8-jdk
ENV JAVA_HOME="/usr/lib/jvm/java-1.8-openjdk"

# install python
RUN apt-get install -y python3-pip python3-dev
RUN cd /usr/local/bin && \
  ln -s /usr/bin/python3 python && \
  ln -s /usr/bin/pip3 pip && \
  pip install --upgrade pip

# apt clean
RUN apt-get clean && \
  rm -rf /var/lib/apt/lists/*


# 프로젝트 작업경로
WORKDIR /myfolder

COPY . /myfolder/

# 플라스크 관련 모듈
RUN pip install flask sqlalchemy flask_sqlalchemy mysql mysql-connector-python pymysql flask_cors flask-socketio 
# 머신러닝 / 전처리 등의 모듈
RUN pip install gensim==3.8.3 wordcloud librosa scikit-learn==0.24.2 pydub konlpy wheel

EXPOSE 5000

CMD ["python", "app.py"]

# docker build . -t '이미지명 설정'
# docker run -d --name '컨테이너명 설정' -p '외부접근포트':'도커내부포트' '구동할 이미지명'
# docker run -d --name '컨테이너명 설정' -p '외부접근포트':'도커내부포트' -v ${PWD}'로컬경로':'컨테이너경로' '구동할 이미지명'

# docker build . -t ft_5000
# docker run -d --name con_ft_5000 -p 8080:8080 ft_5000
# docker run -d --name con_ft_5000 -p 5000:5000 -v ${PWD}:/myfolder/ ft_5000
