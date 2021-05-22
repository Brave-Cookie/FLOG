const models = require('../../models');
const Op = require('sequelize').Op;


exports.create = async (req, res, next) => {
    try{
        const req_pi = req.body ;
        
        // 사용할 테이블들을을 객체에 저장
        let table_pi = models.project_info;
        let table_up = models.user_project;

        
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
        let table_up = models.user_project;
        let table_pi = models.project_info;
        
        
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

exports.issueCreate = async (req, res, next) => {
    try{
        let table_pi = models.project_issue;
        const req_pi = req.body;
        
        table_pi.findOne({where: {project_id : req_pi.project_id} }).then(
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
                message : '/issue/create 에서 에러'
            });
        }
}

exports.issueList = async (req, res, next) => {
    try {
        const project_id = req.params.project_id
        let table_pi = models.project_issue;
        
        table_pi.findAll({
            raw : true,     // *중요* : 테이블에서 select 할때 raw:true 해놓으면 value만 추출
            attributes: ['issue_content'], // issue_content 속성만 고르겠다~
            where: {project_id : project_id},
        }).then(
            (result) => {
                console.log(result)
                 return res.status(200).json({
                            message : '추출성공!!',
                            list : result
                        });
            }
        )
        } catch(err){   // 에러나면 로그 찍고 실패 신호 보냄
            console.log(err);
            res.status(400).json({
                message : '/issue/list 에서 에러'
            });
        }
}

exports.searchMember = async (req, res, next) => {
    try {
        const user_name = req.params.user_name
        let table_ui = models.user_info;
        
        table_ui.findAll({
            raw : true,     // *중요* : 테이블에서 select 할때 raw:true 해놓으면 value만 추출
            attributes: ['user_id'], // user_id 속성만 고르겠다~
            where: {user_name : user_name},
        }).then(
            (result) => {
                if (result.length!=0) {   //사용자 이름에 해당하는 아이디가 존재한다면
                    console.log(result)
                    return res.status(200).json({
                        message: '추출성공!!',
                        list: result
                    });
                }
                else {          //해당사용자가 없음
                    return res.status(202).json({
                        message: '해당하는 사용자가 없습니다.',
                        code : 'search_1'
                    })
                }
            }
        )
        } catch(err){   // 에러나면 로그 찍고 실패 신호 보냄
            console.log(err);
            res.status(400).json({
                message : '/member/search 에서 에러'
            });
        }
}


exports.addMember = async (req, res, next) => {
    try{
        let table_up = models.user_project;
        const req_pi = req.body;


        // hanjo
        // findAll -> findOne 으로 변경하니까 됨.
        // + findAll 쓰면 where 조건에서 default가 OR로 컬럼검사 하는것 같음.
        table_up.findOne({
            raw: true,
            where: {
                project_id: req_pi.project_id,
                user_id: req_pi.user_id
            }
        }).then(
            (result) => {
                if (result) {   //이미 추가한 사용자
                    return res.status(202).json({
                        message: "이미 추가한 사용자입니다",
                        code: 'add_1'
                    })
                }
                else {
                    table_up.create({
                        user_id: req_pi.user_id,
                        project_id: req_pi.project_id
                    })
                    // 그리고 삽입 성공 신호 200을 보낸다.
                    return res.status(200).json({ message: '삽입성공' });
                }
            })
        } catch(err){   // 에러나면 로그 찍고 실패 신호 보냄
            console.log(err);
            res.status(400).json({
                message : '/member/add 에서 에러'
            });
        }
}

exports.logList = async (req, res, next) => {
    try {
        const project_id = req.params.project_id
        const table_pm = models.project_meeting
        const table_mi = modls.meeting_info

        table_pm.findAll({
            raw: true,     // *중요* : 테이블에서 select 할때 raw:true 해놓으면 value만 추출
            attributes: ['meeting_id'],
            where: {
                project_id : project_id,
            }
        }).then(
            (result) => {
                console.log(result)
                table_mi.findAll({
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
            })
        } catch(err){   // 에러나면 로그 찍고 실패 신호 보냄
            console.log(err);
            res.status(400).json({
                message : '/log/list 에서 에러'
            });
        }
}


