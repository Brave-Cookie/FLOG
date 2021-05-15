const router = require('express').Router();
const models = require('../models');


router.get('/', function(req, res, next) {
    res.render('test_front');
});


router.get('/console', function(req, res, next) {
    console.log('test start!!');

    // 참고 !! 
    // https://avengersrhydon1121.tistory.com/236
    // https://juhi.tistory.com/13

    // --------------------- 콘솔로 테스트할 코드 쓰는곳 ---------------------
    
    const table_pi = models.project_info;

    // 컬럼(열, 속성) 하나만 출력하기
    table_pi.findAll({
        raw : true,     // *중요* : 테이블에서 select 할때 raw:true 해놓으면 value만 추출
        attributes : ['project_id']
    }).then(
        // 결과 쿼리셋 생성
        (result) => {
            console.log(result);
            // 마지막 행의 값 추출
            var last_pi = result[result.length-1].project_id 
            console.log(last_pi);
        }
    )

    // ----------------------------------------------------------------------


    return res.redirect('/')
});

module.exports = router;
