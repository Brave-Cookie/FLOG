const models = require('../../models');
const Op = require('sequelize').Op;

function getMode(array) {
            // 1. 출연 빈도 구하기 
            const counts = array.reduce((pv, cv) => {
                pv[cv] = (pv[cv] || 0) + 1;
                return pv;
            }, {});
            // 2. 최빈값 구하기 
            const keys = Object.keys(counts);
            let mode = keys[0];
            keys.forEach((val, idx) => {
                if (counts[val] > counts[mode]) {
                    mode = val;
                }
            });
            return mode;
}
        
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
                //console.log(result)
                return res.status(200).json({
                    message : '추출성공!!',
                    list: result
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
exports.logRank = async (req, res, next) => {
    try{
        const meeting_id = req.params.meeting_id
        const feeling = req.params.feeling
        let table_li = models.log_info;
        //----------------------------test--------------------------------------------------------  
        let result_rank=await table_li.findAll({
            raw: true,
            attributes: ['user_id','log_feeling'], // p_i 속성만 고르겠다~
            where: {
                meeting_id : meeting_id,
                log_feeling: feeling
                }
            
        })
        let first = []
        for (let i = 0; i < result_rank.length; i++) {
            first.push(result_rank[i].user_id)
        }
        console.log(first)
        console.log("가장많은사람:", getMode(first))
        firstrank = getMode(first)
        
        let table_ui = models.user_info;
        table_ui.findOne({
            raw: true,
            attributes: ['user_name'],
            where: { user_id: firstrank }
        }).then(
            (row) => {
                console.log("가장많이 나온사람", row.user_name)
                return res.status(200).json({
                message : '랭킹성공!!',
                firstrank:row.user_name
        })
            })
        
        
        } catch(err){   // 에러나면 로그 찍고 실패 신호 보냄
            console.log(err);
            res.status(400).json({
                message : '/log/rank 에서 에러'
            });
        }
}

        //----------------------------------------------------------------------------------------
        
        
     
        
