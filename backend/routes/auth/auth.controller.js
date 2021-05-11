const models  = require('../../models');

// 
exports.register = async (req, res, next) => {
    try{
        // 프론트에서 넘어온 요청의 body에서 데이터를 꺼낸다
        const req_ui = req.body ;
        // 사용할 user_info 테이블을 객체에 저장
        const tabe_ui = models.user_info;

        // 테이블에서 프론트에서 넘어온 id에 해당하는 row를 찾음
        tabe_ui.findOne({where: {user_id : req_ui.user_id} }).then(
            (row) => {
                // id가 중복된다면 (row가 존재한다면) 중복메시지 보냄
                if(row){
                    return res.status(204).json({
                        code : 'resgister_1' ,
                        message : '중복된 ID 있음'
                    });
                }
                // 만약 중복 id가 없다면
                else{
                    // DB에 삽입하기
                    tabe_ui.create({
                        user_id : req_ui.user_id,
                        user_pw : req_ui.user_pw,
                        user_email : req_ui.user_email,
                        user_name : req_ui.user_name
                    })
                    // 그리고 삽입 성공 신호 200을 보낸다.
                    return res.status(200).json({message : '삽입성공'});
                }
            }
        )

     } catch(err){   // 에러나면 로그 찍고 실패 신호 보냄
        console.log(err);
        res.status(400).json({
            message : '/register 에서 에러'
        });
    }
}


exports.login = async (req, res, next) => {

    try{
        // 사용할 테이블 저장
        const tabe_ui = models.user_info;
        // 전송받은 데이터 꺼냄
        const req_data = req.body ;
        console.log(req_data)

        // 
        tabe_ui.findOne({where: {user_id : req_data.user_id} }).then(
            (row) => {
                // 1. 가입되지 않은 ID
                
                // 2. 비번 틀림
                // 3. 비번 맞음
                
            }
        )

    } catch(err){ 
        console.log(err);
        res.status(400).json({
            message : '/login 에서 에러'
        });
    }

    

    // id 확인





    /*

    // jwt 시크릿 키 추출
    const jwt_key = require('../../config/config.json').JWT_SECRET;
    */
    
    
}
