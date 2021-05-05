
// app.js 전반적인 프로젝트 설정 파일

// ------------------------------------------------------( 모듈(라이브러리) 선언 )------------------------------------------------------

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var app = express();

// ------------------------------------------------------( 폴더 설정)------------------------------------------------------

/* ejs 사용할때. api서버로 사용하기때문에 안쓴다.

// veiws 기능 폴더를 'veiws' 이름을 가진 폴더로 지정.
app.set('views', path.join(__dirname, 'views'));
// view engine을 ejs로 지정
app.set('view engine', 'ejs');
*/

// ------------------------------------------------------( 미들웨어 등록 )------------------------------------------------------

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// public 폴더의 가상경로를 / 로 설정한 것 -> ejs에서 css/js 참조시 사용
app.use(express.static(path.join(__dirname, 'public')));


// ------------------------------------------------------( 라우터 모듈에 URL이름 매핑 )------------------------------------------------------

// api 라우터에 index.js 매핑
app.use('/api', require('./routes/index'));


/* ejs 사용할때. vue와 연동 후 필요없음
app.use('/', require('./routes/r_index'));
app.use('/next', require('./routes/r_next'));
app.use('/check_DB', require('./routes/r_chk_DB'));
app.use('/run_py', require('./routes/r_run_py'));
*/

// vue 라우터와 express 라우터를 연동
//app.use(require('connect-history-api-fallback')());

// ------------------------------------------------------( 모델등록 )------------------------------------------------------

/* 이건 migrations 기능을 사용할때 
const models = require("./models/index.js");

models.sequelize.sync().then( () => {
  console.log(" DB 연결 성공");
}).catch(err => {
  console.log("연결 실패");
  console.log(err);
})
*/

// ------------------------------------------------------( 에러처리 )------------------------------------------------------


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
