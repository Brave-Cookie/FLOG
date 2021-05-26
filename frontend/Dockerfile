# node.js 이미지 생성
FROM node:14.16.1-alpine

# 도커 컨테이너 내부의 경로 지정
WORKDIR /myfolder

# 첫번째 . >>> docker 명령어 실행한 로컬 폴더 기준 (여기부터 하위 파일 모두 복사)
# 두번째 /myfolder/ >>> linux 폴더 기준 (이 폴더에 복사)
COPY . /myfolder/

# 
RUN npm install

# 도커 내부에서 열어둘 포트 지정
EXPOSE 8080

#
CMD ["npm", "start"]


# docker build . -t '이미지명 설정'
# docker run -d --name '컨테이너명 설정' -p '외부접근포트':'도커내부포트' '구동할 이미지명'

# docker build . -t react_8080
# docker run -d --name con_react_8080 -p 8080:8080 react_8080
# docker run -d --name con_react_8080 -p 8080:8080 -v ${PWD}:/myfolder/ react_8080
