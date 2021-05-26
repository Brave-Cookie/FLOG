FROM node:14.16.1-alpine

WORKDIR /myfolder

COPY . /myfolder/

RUN npm install
RUN npm install -g nodemon

EXPOSE 3000

CMD ["nodemon", "www"]


# docker build . -t '이미지명 설정'
# docker run -d --name '컨테이너명 설정' -p '외부접근포트':'도커내부포트' '구동할 이미지명'

# docker build . -t react_8080
# docker run -d --name con_react_8080 -p 8080:8080 react_8080
# docker run -d --name con_react_8080 -p 8080:8080 -v ${PWD}:/myfolder/ react_8080
