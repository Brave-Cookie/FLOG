const models  = require('../../models');

// 
exports.register = async (req, res, next) => {

    try{
        // 프론트에서 넘어온 요청의 body에서 데이터를 꺼낸다
        var user_info = req.body ;
        // user_info 테이블을 객체에 저장
        const ui_table = models.user_info;

        // 테이블에서 프론트에서 넘어온 id에 해당하는 row를 찾음
        ui_table.findOne({where: {user_id : user_info.user_id} }).then(
            (tmp_user_id) => {
                console.log(tmp_user_id)
            }
        )

        

        

        // id/email 중복 검사
        
        

        /*
        // 꺼낸 데이터를 DB에 삽입하기
        ui_table.create({
            user_id : user_info.user_id,
            user_pw : user_info.user_pw,
            user_email : user_info.user_email,
            user_name : user_info.user_name
        })
        console.log('삽입 성공')
        */

        // 그리고 삽입 성공 신호 200을 보낸다.
        return res.status(200).json();

     } catch(err){   // 만약 실패시 로그 찍고 실패 신호 보냄
        console.log(err);
        res.status(400).json({
            state : 400,
        });
    }
}


exports.login = async (req, res, next) => {
    // jwt 시크릿 키 추출
    const jwt_key = require('../../config/config.json').JWT_SECRET;
    
    
}
