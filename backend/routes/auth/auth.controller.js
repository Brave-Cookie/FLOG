const models  = require('../../models');

// 
exports.register = async (req, res, next) => {

    try{
        // 프론트에서 넘어온 요청의 body에서 데이터를 꺼낸다
        var user_info = req.body ;
        //delete user_info.passwordConfirm;

        console.log(user_info)

        // 꺼낸 데이터를 DB에 삽입하기
        models.user_info.create({
            user_id : user_info.user_id,
            user_pw : user_info.user_pw,
            user_email : user_info.user_email,
            user_name : user_info.user_name
        })
        console.log('삽입 성공')

        // 그리고 삽입 성공 신호 200을 보낸다.
        res.status(200).json({
        });
            
    } catch(err){   // 만약 실패시 로그 찍고 실패 신호 보냄
        console.log(err);
        res.status(400).json({
            state : 400,
        });
    }
    

}
