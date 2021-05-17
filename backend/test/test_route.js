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
    
     const user_id = 'test'
        var table_up = models.user_project;
        var table_pi = models.project_info;
        var project_dict = {}
        // 현재 프로젝트의 마지막 id 찾기
        table_up.findAll({
            raw : true,     // *중요* : 테이블에서 select 할때 raw:true 해놓으면 value만 추출
            attributes: ['project_id'], // p_i 속성만 고르겠다~
            where: {
                user_id : user_id
                    },
        }).then(
            (result) => {
                for (i = 0; i < result.length; i++){
                    table_pi.findOne({
                        raw : true,
                        where: { project_id: result[i].project_id }
                    }).then(
                        (row) => {
                            console.log(row.project_id)
                            console.log(row.project_name)

                            project_dict[row.project_id] = row.project_name
                            
                        }   
                    )

                }
               
              
            }
           
    )
     console.log(project_dict)
      
    // ----------------------------------------------------------------------


    return res.redirect('/')
});

module.exports = router;
