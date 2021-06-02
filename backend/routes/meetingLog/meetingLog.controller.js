const models = require('../../models');
const Op = require('sequelize').Op;
const sequelize = require("sequelize");

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
    try {
        const meeting_id = req.params.meeting_id
        let table_li = models.log_info;

        table_li.findAll({
            raw: true,     // *중요* : 테이블에서 select 할때 raw:true 해놓으면 value만 추출
            attributes: ['user_id', 'log_time', 'log_feeling', 'log_text'], // p_i 속성만 고르겠다~
            where: { meeting_id: meeting_id },
        }).then(
            (result) => {
                //console.log(result)
                return res.status(200).json({
                    message: '추출성공!!',
                    list: result
                })
            }
        )
    } catch (err) {   // 에러나면 로그 찍고 실패 신호 보냄
        console.log(err);
        res.status(400).json({
            message: '/log/list 에서 에러'
        });
    }
}

exports.logFilter = async (req, res, next) => {
    try {
        const meeting_id = req.params.meeting_id
        const feeling = req.params.feeling
        let table_li = models.log_info;

        table_li.findAll({
            raw: true,     // *중요* : 테이블에서 select 할때 raw:true 해놓으면 value만 추출
            attributes: ['user_id', 'log_time', 'log_feeling', 'log_text'], // p_i 속성만 고르겠다~
            where: {
                meeting_id: meeting_id,
                log_feeling: feeling
            },
        }).then(
            (result) => {
                //console.log(result)
                return res.status(200).json({
                    message: '추출성공!!',
                    list: result
                })
            }
        )
    } catch (err) {   // 에러나면 로그 찍고 실패 신호 보냄
        console.log(err);
        res.status(400).json({
            message: '/log/list/filter 에서 에러'
        });
    }
}
exports.logRank = async (req, res, next) => {
    try {
        const meeting_id = req.params.meeting_id
        const feeling = req.params.feeling
        let table_li = models.log_info;

        //참여도 순위 부분 -----------------------------------------------------------------
        let rank = await table_li.findAll({
            raw: true,
            attributes: [
                'user_id',
                [sequelize.fn('SUM', sequelize.col('log_realtime')), 'log_realtime'],
            ],
            group: ['user_id'],
            where: {
                meeting_id: meeting_id
            },
            order: [[sequelize.fn('SUM', sequelize.col('log_realtime')), 'DESC']]
        })


        let total_ranking = []
        for (let i = 0; i < rank.length; i++) {
            total_ranking.push(rank[i].user_id)
        }

        //-------------------------------------------------------------------------------------
        //감정별 랭킹 부분----------------------------------------------------------------------

        let result_rank = await table_li.findAll({
            raw: true,
            attributes: ['user_id', 'log_feeling'], // p_i 속성만 고르겠다~
            where: {
                meeting_id: meeting_id,
                log_feeling: feeling
            }
        })

        let first = []
        for (let i = 0; i < result_rank.length; i++) {
            first.push(result_rank[i].user_id)
        }

        firstrank = getMode(first)

        //각감정별 1등이 몇번 발언했는지
        let count = 0;
        for (let i = 0; i < first.length; i++) {
            if (first[i] === firstrank) {
                count++;
            }
        }

        //user_id 로 이름 찾아오기
        let table_ui = models.user_info;

        if (firstrank) {
            table_ui.findOne({
                raw: true,
                attributes: ['user_name'],
                where: { user_id: firstrank }
            }).then(
                (row) => {
                    console.log(feeling , " 감정 1위 : ", row.user_name)
                    return res.status(200).json({
                        message: '랭킹성공!!',
                        firstrank: row.user_name,
                        total_rank: total_ranking,
                        count: count
                    })
                })
        }
        else {
            // 해당 감정이 아예 나오지 않았을 경우
            console.log(feeling , " 감정은 나오지 않았음")
            return res.status(202).json({
                total_rank: total_ranking,
            })
        }

    } catch (err) {   // 에러나면 로그 찍고 실패 신호 보냄
        console.log(err);
        res.status(400).json({
            message: '/log/rank 에서 에러'
        });
    }
}

//30초마다 평균감정 보내주기
exports.avgFeeling = async (req, res, next) => {
    try {
        let table_avgfeeling = models.avg_emotion;
        const meeting_id = req.params.meeting_id;
        table_avgfeeling.findAll({
            raw: true,
            attributes: ['time', 'emotion'],
            where: { meeting_id: meeting_id }
        }).then(
            (row) => {
                console.log(row)
                return res.status(200).json({
                    message: '평균감정 성공!!',
                    avg: row
                })
            })
    } catch (err) {   // 에러나면 로그 찍고 실패 신호 보냄
        console.log(err);
        res.status(400).json({
            message: '/log/avgFeeling 에서 에러'
        });
    }
}
