const models = require('../../models');
const Op = require('sequelize').Op;


exports.create = async (req, res, next) => {
    try{
        const req_pi = req.body ;
        
        // 사용할 테이블들을을 객체에 저장
        var table_pi = models.project_info;
        var table_up = models.user_project;

        // 현재 프로젝트의 마지막 id 찾기
        table_pi.findAll({
            raw : true,     // *중요* : 테이블에서 select 할때 raw:true 해놓으면 value만 추출
            attributes : ['project_id'] // p_i 속성만 고르겠다~
        }).then(
            (result) => {
                // 새로넣는 프로젝트 id는 마지막 행의 project_id + 1
                const new_p_id = result[result.length-1].project_id + 1

                // 1. project_info에 프젝이름으로 삽입
                table_pi.create({
                    project_id : new_p_id,
                    project_name: req_pi.project_name
                })
                // 2. user_project에 매핑하여 삽입
                table_up.create({
                    project_id: new_p_id,
                    user_id : req_pi.user_id
                })
                
                // 그리고 삽입 성공 신호 200을 보낸다.
                return res.status(200).json({message : '삽입성공'});
            }
        )
     } catch(err){   // 에러나면 로그 찍고 실패 신호 보냄
        console.log(err);
        res.status(400).json({
            message : '/create 에서 에러'
        });
    }
}

exports.list = async (req, res, next) => {
    try{
        const user_id = req.params.user_id
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
                        return res.status(200).json({
                            message : '추출성공!!',
                            list : result2
                        });
                    }
                )
            }
        )




        } catch(err){   // 에러나면 로그 찍고 실패 신호 보냄
            console.log(err);
            res.status(400).json({
                message : '/list 에서 에러'
            });
        }
}

exports.issue = async (req, res, next) => {
    try{
        const table_pi = models.project_issue;
        const req_pi = req.body;
        table_pi.findOne({where: {project_id : project_id} }).then(
            (row) => {
                    // DB에 삽입하기
                    table_pi.create({
                        project_id: req_pi.project_id,
                        issue_content : req_pi.issue_content
                    })  
                    // 그리고 삽입 성공 신호 200을 보낸다.
                    return res.status(200).json({message : '삽입성공'});
                }
        )
        } catch(err){   // 에러나면 로그 찍고 실패 신호 보냄
            console.log(err);
            res.status(400).json({
                message : '/issue 에서 에러'
            });
        }
}








