# 🔮 FLOG

### 본 프로젝트 협업 규칙

<br>

## 💻 Commit 규칙

```
< 예시 >
[BE] feat: Brave Cookie #12
```

### 1. 상위 카테고리
> 영역별 상위 카테고리를 명시

|카테고리명|설명|
|---|---|
|[FE]|프론트엔드|
|[BE]|백엔드|
|[CO]|레포 공통|

### 2. 커밋 종류
> 두 번째로 수정한 종류에 따라 커밋 메시지를 선택

|메시지명|설명|
|---|---|
|feat|새로운 기능 추가 관련|
|fix|버그 수정|
|test|테스트 코드, 리팩토링 테스트 코드 추가|
|refactor|코드 리팩토링(기능향상)|
|chore|빌드 업무 수정, 패키지 매니저 수정|
|docs|문서 수정(md, git관련 파일, 이미지파일 수정)|
|style|코드 formatting, 세미콜론(;) 누락, 코드 변경이 없는 경우|

### 3. 관련 이슈
> 작성한 커밋과 관련된 이슈 번호를 매핑

- 이슈 번호뒤에 아래에 써놓은 명령어를 붙여서 커밋 날리면 자동으로 이슈가 close 된다.   
`close / closes / closed / fix / fixes / fixed / resolve /resolves / resolved`
```
< 예시 >
[BE] feat: Brave Cookie close #1
```

### 보안 관련

- **(중요)** 어떠한 KEY값이나 DB 접속 정보가 포함된 커밋을 날리지 않는다.
- 한 번이라도 날리면 커밋 로그가 남아서 보안에 취약하기 때문~
- 환경변수나 json/gitignore 등의 방식을 사용해서 원격 repo에는 절대 올리지 않는다.

<br>

## 🌳 Branch / PR / Issue 규칙

### Branch

- `master` 브랜치에서는 문서 작업 외에는 작업하지 않는다.
- 브랜치 이름은 `hanjo_test` 이런 식으로 자신의 닉네임을 명시해서 생성한다.
- 테스트 브랜치나 더이상 안쓰는 브랜치는 삭제한다.

### Pull Request

- `master` 브랜치에만 merge한다.
- 자신이 계획한 기능이 완료됐을 경우에만 PR 작성
- 팀원과 협의 후 PR을 작성하며 독자적으로 PR 생성 후 merge하지 않는다. 

### Issue

- 앞으로 할 일이나 버그 등을 기록한다.
- 추가적인 정보는 [Wiki](https://github.com/Brave-Cookie/Wiki) 레포에서 작성한다.
- 이슈에 맞는 라벨을 알맞게 선택한다.
- 필요한 라벨이 있다면 공동 계정(Brave-Cookie)의 `Settings` -> `Repository Defaults` 에서 추가한다.

<br>

## 🤝 기타 협업

### 의존성 관리
> [문서 링크](https://github.com/Brave-Cookie/Wiki/blob/master/%EC%9D%98%EC%A1%B4%EC%84%B1%EA%B4%80%EB%A6%AC.md)

- 모듈을 전역으로 설치한 경우 Wiki 레포의 의존성 관리 문서에 기록!

### Rest API 통신 
> [문서 링크](https://github.com/Brave-Cookie/Wiki/blob/master/rest%ED%86%B5%EC%8B%A0%EC%82%AC%EC%A0%84.md)

- 프론트 - 백 협업시 데이터 타입이나 URL 경로를 한 문서에 기록하여 혼란을 차단하자!