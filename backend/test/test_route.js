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
    
    const user_id = 'test'
    var table_up = models.user_project;
    var table_pi = models.project_info;
    
    // 현재 프로젝트의 마지막 id 찾기
    table_up.findAll({
        raw : true,     // *중요* : 테이블에서 select 할때 raw:true 해놓으면 value만 추출
        attributes: ['project_id'], // p_i 속성만 고르겠다~
        where: {user_id : user_id},
    }).then(
        (result) => {
            console.log(result)
            table_pi.findAll({
                raw : true,
                where: {[Op.or] : result }
            }).then(
                (result2) => {
                    console.log(result2)
                }
            )
        }
    )
     console.log(project_dict)
      
    // ----------------------------------------------------------------------


    return res.redirect('/')
});

module.exports = router;
