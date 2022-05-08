# 🔮 FLOG

### 실시간 감정분석 화상회의 및 감정상황 회의록 서비스
> 🥉 세종창의설계경진대회 장려상 수상

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FBrave-Cookie%2FFLOG&count_bg=%23CBC5FF&title_bg=%239172F6&icon=ello.svg&icon_color=%23E7E7E7&title=FLOG&edge_flat=false)](https://hits.seeyoufarm.com)

## 프로젝트 관련 링크
> FLOG 사이트 링크 : ~~https://flog.tk~~ (백엔드 서버 종료)   
> 시연 영상 : https://www.youtube.com/watch?v=LY4to2DHiIE

- [프로젝트 팀 계정](https://github.com/Brave-Cookie)
- [협업 문서 Wiki](https://github.com/Brave-Cookie/Wiki)
- [감정분석 모델](https://github.com/Brave-Cookie/Emotion-recognition)

<br>

## 팀원

<table>
  <tr>
    <td align="center"><a href="https://github.com/jerimo"><img src="https://avatars.githubusercontent.com/u/48341341?v=4" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/jeonbar2"><img src="https://avatars.githubusercontent.com/u/76610357?v=4" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/hanjo8813"><img src="https://avatars.githubusercontent.com/u/71180414?v=4" width="100px" /></a></td>
  </tr>
  <tr>
    <td align="center"><b>김수지</b></td>
    <td align="center"><b>강전호</b></td>
    <td align="center"><b>한재원</b></td>
  </tr>
  <tr>
    <td align="center"><b>💻Frontend</b></td>
    <td align="center"><b>🔨Backend</b></td>
    <td align="center"><b>🔧Backend</b></td>
  </tr>
</table>

<br>

## ✨ FLOG 소개

![node-bg](https://img.shields.io/badge/Nodejs-v14.16.1-yellowgreen?logo=node.js)
![react-bg](https://img.shields.io/badge/React-v17.0.2-1cf?logo=react)
![express-bg](https://img.shields.io/badge/Express-v4.16.1-yellow?logo=Express)
![python-bg](https://img.shields.io/badge/Python-v3.9-blue?logo=Python)
![flask-bg](https://img.shields.io/badge/Flask-v1.1.2-lightgray?logo=Flask)
![docker-bg](https://img.shields.io/badge/Docker-v20.10.6-3cf?logo=Docker)

![FLOG 표지](https://user-images.githubusercontent.com/71180414/122667016-8becbe00-d1eb-11eb-99c7-dda557b310fa.png)

FLOG는 실시간 화상회의와 음성 감정분석을 결합한 차세대 화상회의 플랫폼입니다.

사용자는 협업 환경에서 프로젝트 단위로 간편하게 회의를 관리할 수 있습니다.

화상회의에서 음성은 실시간으로 텍스트화되고, 모든 참가자의 감정과 참여도를 산정합니다.

모든 발언은 회의록으로 저장되며, 회의가 끝난 후 회의록 요약과 감정요소를 활용한 기능을 제공합니다.

<br>


## 🎮 주요 기능

|![BRVdel2ski](https://user-images.githubusercontent.com/71180414/123557220-a665ff00-d7ca-11eb-9e86-51b56843ba71.gif)|
|:--:|
|**실시간 회의 기본 기능**|

1. 회의방을 생성 후 참여코드를 클립보드에 복사하여 공유할 수 있습니다.
2. 회의가 시작되면 모든 발언은 회의록에 저장됩니다.
3. 음성은 실시간으로 STT 되어 화자별로 화면에 표시됩니다.

<br>

|![oDbwVDMI4W](https://user-images.githubusercontent.com/71180414/123557562-7cadd780-d7cc-11eb-8af2-531e7180cd9d.gif)|
|:--:|
|**실시간 회의 감정분석**|

1. 화자의 음성으로 감정을 분석한 결과를 이모티콘으로 나타냅니다. (정확도 85% : [감정분석 모델 Repo](https://github.com/Brave-Cookie/Emotion-recognition))
2. 30초마다 회의의 평균 감정과 참여도 순위를 산정합니다. (왼쪽 아래)
3. 참여도 순위는 텍스트 랭크와 누적 발언횟수, 음성 길이를 기준으로 산정됩니다.

<br>

|![EUcsu5cCGJ](https://user-images.githubusercontent.com/71180414/123556787-30f92f00-d7c8-11eb-9dfc-0903215f5494.gif)|
|:--:|
|**감정 회의록 분석**|

1. 감정 회의록을 감정별로 필터링하여 볼수 있습니다.
2. koNLpy/gensim 라이브러리를 사용해 워드 클라우드와 회의록을 3문장으로 요약하여 보여줍니다.
3. 시간별 회의 평균감정 변화 추이와 감정의 빈도를 그래프로 나타냅니다.
4. 참여도 및 감정 순위를 보여줍니다.

<br>

## ⚙ 시스템 아키텍처

|![최종아키텍처](https://user-images.githubusercontent.com/71180414/120897349-a1e17700-c660-11eb-864e-e3d86c714734.png)|
|:--:|
|**전체 시스템**|

<br>

|![음성전달](https://user-images.githubusercontent.com/71180414/123558249-365a7780-d7d0-11eb-815f-fd9926351c31.png)|
|:--:|
|**실시간 음성처리**|

<br>

## 📜 기술 스택

### AI model

|<img width=70 src='https://user-images.githubusercontent.com/71180414/123558541-c1883d00-d7d1-11eb-93da-fc958d9dd4ee.png' />|<img width=70 src='https://user-images.githubusercontent.com/71180414/123558520-a7e6f580-d7d1-11eb-9e6e-a07fc85820e4.png' />|<img width=70 src='https://user-images.githubusercontent.com/71180414/123558553-d06eef80-d7d1-11eb-8a0e-59848072e879.png' />|
|:--:|:--:|:--:|
|sklearn|librosa|pydub|

<br>

### Frontend

|<img width=70 src='https://user-images.githubusercontent.com/71180414/123558580-fe543400-d7d1-11eb-8d64-468f5ed59150.png' />|<img width=70 src='https://user-images.githubusercontent.com/71180414/123558719-b97ccd00-d7d2-11eb-9349-ec8e85356450.png' />|<img width=70 src='https://user-images.githubusercontent.com/71180414/123558722-bd105400-d7d2-11eb-8241-1813e793cd75.png' />|
|:--:|:--:|:--:|
|React|Web RTC|Socket.io|

<br>

### Backend

|<img width=70 src='https://user-images.githubusercontent.com/71180414/123558788-14162900-d7d3-11eb-8ae8-dfe43184f827.png' />|<img width=70 src='https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1597622693/noticon/m9x6mei2mo39iesqulm9.png' />|<img width=70 src='https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566919737/noticon/gjxns0py6vnakzyu3msu.png' />|<img width=70 src='https://user-images.githubusercontent.com/71180414/123558861-838c1880-d7d3-11eb-859a-73008f10bbe4.png' />|<img width=70 src='https://user-images.githubusercontent.com/71180414/123558722-bd105400-d7d2-11eb-8241-1813e793cd75.png' />|<img width=70 src='https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1603423163/noticon/az0cvs28lm7gxoowlsva.png' />|
|:--:|:--:|:--:|:--:|:--:|:--:|
|Express|Sequelize ORM|Flask|SQLAlchemy ORM|Socket.io|MySql|

<br>

### Infrastructure

|<img width=70 src='https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566913282/noticon/xyzfawahazvkwiyje7it.png' />|<img width=70 src='https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566798146/noticon/lku5cppzh8r7awwsmmko.png' />|<img width=70 src='https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566914346/noticon/eaj5maxvh8jwaviozt5p.png' />|<img width=70 src='https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566914173/noticon/kos1xkevxtr81zgwvyoe.svg' />|<img width=70 src='https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1570176339/noticon/izlj41f9z1jt6ykiwsyl.png' />|
|:--:|:--:|:--:|:--:|:--:|
|Docker|Nginx|Netlify|AWS EC2|AWS RDS|

<br>
