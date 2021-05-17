const router = require('express').Router();
const models = require('../models');
const Op = require('sequelize').Op;

router.get('/', function(req, res, next) {
    res.render('test_front');
});


router.get('/console', function(req, res, next) {
    console.log('test start!!');

    // 참고 !! 
    // https://avengersrhydon1121.tistory.com/236
    // https://juhi.tistory.com/13
    // https://pjt3591oo.github.io/sequelizejs_translate/build/html/CoreConcepts/Querying.html

    // --------------------- 콘솔로 테스트할 코드 쓰는곳 ---------------------
    

    
    // ----------------------------------------------------------------------


    return res.redirect('/')
});

module.exports = router;
