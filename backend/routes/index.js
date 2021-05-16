const router = require('express').Router();

// 이 index.js에서 모든 기능 대분류로 라우터 관리

// test 기능 매핑
// http://localhost:3000/api
router.use('/test', require('./test/index'))
router.use('/auth', require('./auth/index'))

router.use('/project',require('./project/index'))


module.exports = router;