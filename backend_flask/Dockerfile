FROM ubuntu:latest

ENV LANG=C.UTF-8
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && \
  apt-get install -y --no-install-recommends tzdata g++ curl

# install java
RUN apt-get install -y openjdk-8-jdk
ENV JAVA_HOME="/usr/lib/jvm/java-1.8-openjdk"

# install python
RUN apt-get install -y python3-pip python3-dev default-libmysqlclient-dev build-essential
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

# 파이썬 모듈 설치
RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]

# docker build . -t '이미지명 설정'
# docker run -d --name '컨테이너명 설정' -p '외부접근포트':'도커내부포트' '구동할 이미지명'
# docker run -d --name '컨테이너명 설정' -p '외부접근포트':'도커내부포트' -v ${PWD}'로컬경로':'컨테이너경로' '구동할 이미지명'

# docker build . -t flask_5000
# docker run -d --name con2_flask_5000 -p 5000:5000 flask_5000
# docker run -d --name con_flask_5000 -p 5000:5000 -v ${PWD}:/myfolder/ flask_5000
