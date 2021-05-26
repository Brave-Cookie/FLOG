const models = require('../../models');
const Op = require('sequelize').Op;

exports.logFetch = async (req, res, next) => {
    try{
        const meeting_id = req.params.meeting_id
        let table_li = models.log_info;
        
        
        
        table_li.findAll({
            raw : true,     // *중요* : 테이블에서 select 할때 raw:true 해놓으면 value만 추출
            attributes: ['user_id','log_time','log_feeling','log_text'], // p_i 속성만 고르겠다~
            where: {meeting_id : meeting_id},
        }).then(
            (result) => {
                //console.log(result)
                return res.status(200).json({
                    message : '추출성공!!',
                    list : result
                    })
            }
        )
        } catch(err){   // 에러나면 로그 찍고 실패 신호 보냄
            console.log(err);
            res.status(400).json({
                message : '/log/list 에서 에러'
            });
        }
}

exports.logFilter = async (req, res, next) => {
    try{
        const meeting_id = req.params.meeting_id
        const feeling = req.params.feeling
        let table_li = models.log_info;
        
        
        
        table_li.findAll({
            raw : true,     // *중요* : 테이블에서 select 할때 raw:true 해놓으면 value만 추출
            attributes: ['user_id','log_time','log_feeling','log_text'], // p_i 속성만 고르겠다~
            where: {
                meeting_id : meeting_id,
                log_feeling: feeling
                },
        }).then(
            (result) => {
                console.log(result)
                return res.status(200).json({
                    message : '추출성공!!',
                    list : result
                    })
            }
        )
        } catch(err){   // 에러나면 로그 찍고 실패 신호 보냄
            console.log(err);
            res.status(400).json({
                message : '/log/list/filter 에서 에러'
            });
        }
}
