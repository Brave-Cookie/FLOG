const router = require('express').Router();
const controller = require('./test.controller');

// 이 index.js에서는 대기능 하위 소기능별 라우터 관리

// test 대기능의 하위 기능인 chk_DB 기능을 '/chk_DB' 라는 이름의 url로 지정
// // http://localhost:3000/api/test/chk_DB
router.post('/chk_DB', controller.chk_DB);


module.exports = router;