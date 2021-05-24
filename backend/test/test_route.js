const router = require('express').Router();
const models = require('../models');
const Op = require('sequelize').Op;

router.get('/', function(req, res, next) {
    res.render('test_front');
});


router.get('/console', async function(req, res, next) {
    console.log('test start!!');

    // 참고 !! 
    // https://avengersrhydon1121.tistory.com/236
    // https://juhi.tistory.com/13
    // https://pjt3591oo.github.io/sequelizejs_translate/build/html/CoreConcepts/Querying.html

    // --------------------- 콘솔로 테스트할 코드 쓰는곳 ---------------------

    const project_id = 34
    const table_pm = models.project_meeting;
    const table_mi = models.meeting_info
    const tabel_li = models.log_info


    // ** 중요 설명 **
    // 시퀄라이즈는 모든 동작이 비동기적임. 따라서 지금껏 쿼리 결과를 then으로 받아 써야했음
    // then으로 쓰게되면 꼬리물기가 길어지고 중간 결과값을 저장하지 못하더라 (개빡침)
    // 그래서 찾아보니까 아래처럼 쿼리시작할때 await을 써주면 변수에 저장할 수 있음!!!!
    // 개꿀임. then은 단순한 탐색할때만 쓰고 어려운 쿼리는 await을 써주면 될듯?


    // 프로젝트에 포함된 모든 회의(meeting_id) 추출
    let result_m_id = await table_pm.findAll({
        raw: true, 
        attributes: ['meeting_id'],
        where: {
            project_id : project_id,
        }
    })

    // 결과를 보내주기 위한 리스트 생성
    let context = []

    // meeting_id 하나씩 추출하기 위해 for
    for(let i = 0; i <result_m_id.length; i++){

        // m_id에 저장~
        let m_id = result_m_id[i].meeting_id

        // 한 row만 찾는건 findOne으로 찾자!
        // 하나의 meeting_id에 해당하는 정보 불러옴
        let result_m_info = await table_mi.findOne({
            raw: true,
           
            where: {
               
                meeting_id : m_id
            }
        })
        
   
        // 해당 회의(meeting_id)에 참가했던 사용자 추출
        // group 속성을 추가하니까 중복 제거됨 (원리는 모름)
        let result_m_user = await tabel_li.findAll({
            raw: true,
            attributes: ['user_id'],
            group : ['user_id'],
            where: {
                meeting_id : m_id
            }
        })

        // result_m_user의 결과를 이쁘게 파싱해줌 (리스트에 담아줌)
        let user_list = []
        for(let i = 0; i <result_m_user.length; i++){
            user_list.push(result_m_user[i].user_id)
        }

        // 왜 이쁘게 파싱했냐면 한 뭉텅이로 합쳐서 보내주기 위해.
        // result_m_info (json 형식)에 user_id(key)를 추가해서 위에서 파싱한 결과를 담는다
        result_m_info.user_id = user_list
        // 최종 결과물 리스트에 하나의 뭉탱이 push
        
        context.push(result_m_info)
    }
    console.log(context)
    
    
    // ----------------------------------------------------------------------


    return res.redirect('/')
});

module.exports = router;
