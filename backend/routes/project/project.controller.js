const models = require('../../models');

exports.create = async (req, res, next) => {
    try{
        // 프론트에서 넘어온 요청의 body에서 데이터를 꺼낸다
        const req_pi = req.body ;
        // 사용할 project_info 테이블을 객체에 저장
        console.log(req.user_id)
        const table_pi = models.project_info;
         // 사용할 user_project 테이블을 객체에 저장
        const table_up = models.user_project;

        // 테이블에서 프론트에서 넘어온 project_name에 해당하는 row를 찾음
        table_pi.findOne({where: {project_name : req_pi.project_name} }).then(
            (row) => {
                // project_name이 중복된다면 (row가 존재한다면) 중복메시지 보냄
                if(row){
                    console.log('project_name 중복');
                    return res.status(202).json({
                        code : 'create_1' ,
                        message : '중복된 회의이름 있음'
                    });
                }
                // 만약 중복 project_name이 없다면
                else{
                    // DB에 삽입하기
                    table_pi.create({
                        project_name: req_pi.project_name
                    })
                    console.log('project_info DB삽입 성공')
                
                    // 그리고 삽입 성공 신호 200을 보낸다.
                    return res.status(200).json({message : '삽입성공'});
                }
            }
        )

     } catch(err){   // 에러나면 로그 찍고 실패 신호 보냄
        console.log(err);
        res.status(400).json({
            message : '/create 에서 에러'
        });
    }
}
