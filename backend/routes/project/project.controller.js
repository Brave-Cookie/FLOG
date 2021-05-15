const models = require('../../models');

exports.create = async (req, res, next) => {
    try{
        // 프론트에서 넘어온 요청의 body에서 데이터를 꺼낸다
        const req_pi = req.body ;
        // 사용할 project_info 테이블을 객체에 저장
        var table_pi = models.project_info;
         // 사용할 user_project 테이블을 객체에 저장
        var table_up = models.user_project;

        // 테이블에서 프론트에서 넘어온 project_name에 해당하는 row를 찾음
        table_pi.findOne({where: {project_name : req_pi.project_name} }).then(
            (row) => {
                // project_name이 중복된다면 (row가 존재한다면) 중복메시지 보냄
                if(row){
                    console.log('project_name 중복');
                    return res.status(202).json({
                        code : 'create_1' ,
                        message : '중복된 프로젝트이름 있음'
                    });
                }
                // 만약 중복 project_name이 없다면
                else{
                    // 현재 프로젝트의 마지막 id 찾기
                    table_pi.findAll({
                        raw : true,     // *중요* : 테이블에서 select 할때 raw:true 해놓으면 value만 추출
                        attributes : ['project_id'] // p_i 속성만 고르겠다~
                    }).then(
                        (result) => {
                            // 마지막 행의 project_id
                            const new_p_id = result[result.length-1].project_id + 1

                            console.log(req_pi.user_id)
                            console.log(new_p_id)

                            // 1. project_info에 프젝이름으로 삽입
                            table_pi.create({
                                project_id : new_p_id,
                                project_name: req_pi.project_name
                            })

                            // ********************* 이부분이 안됨 위에까지는 잘됨 *********************
                            // 2. user_project에 매핑하여 삽입
                            table_up.create({
                                project_id: new_p_id,
                                user_id : req_pi.user_id
                            })
                            // ************************************************************************
                            
                            // 그리고 삽입 성공 신호 200을 보낸다.
                            return res.status(200).json({message : '삽입성공'});
                        }
                    )
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
