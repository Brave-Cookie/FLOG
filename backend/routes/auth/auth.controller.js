const models  = require('../../models');
const jwt = require("jsonwebtoken");
// 
exports.register = async (req, res, next) => {
    try{
        // 프론트에서 넘어온 요청의 body에서 데이터를 꺼낸다
        const req_ui = req.body ;
        // 사용할 user_info 테이블을 객체에 저장
        const table_ui = models.user_info;
        
        // 테이블에서 프론트에서 넘v어온 id에 해당하는 row를 찾음
        table_ui.findOne({where: {user_id : req_ui.user_id} }).then(
            (row) => {
                // id가 중복된다면 (row가 존재한다면) 중복메시지 보냄
                if(row){
                    console.log('id 중복');
                    return res.status(202).json({
                        code : 'resgister_1' ,
                        message : '중복된 ID 있음'
                    });
                }
                // 만약 중복 id가 없다면
                else{
                    // DB에 삽입하기
                    table_ui.create({
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
        const table_ui = models.user_info;
        // 전송받은 데이터 꺼냄
        const req_data = req.body ;
               
        table_ui.findOne({where: {user_id : req_data.user_id} }).then(
            (row) => {
                if(row){
                    console.log("가입된 ID")
                    // 3. 비번 맞음
                    if(row.user_pw == req_data.user_pw){
                        console.log("로그인 성공")
                        //-------------------------
                        const jwt_key = require('../../config/config.json').JWT_SECRET;
                        console.log(jwt_key)

                        const user_id = row.user_id;
                        const user_name = row.user_name;
                        const user_email = row.user_email

                        var accessToken = jwt.sign(
                            
                            // PAYLOAD
                            {
                                user_id,
                                user_name,
                                user_email
                            },
                            // SIGNATURE
                            jwt_key
                            );
                        console.log(accessToken)
                        //-------------------------
                        return res.status(200).json({
                            message : '로그인성공',
                            accessToken
                            })
                    }
                    // 2. 비번 틀림
                    else{
                        console.log("로그인실패 : 비밀번호가 다릅니다")
                        return res.status(202).json({
                            code : 'login_2',
                            message : '비밀번호 틀립니다'
                            })
                    } 
                }   
                // 1. 가입되지 않은 ID
                else{
                    console.log("로그인 실패 : 가입되지않은 ID")
                    return res.status(202).json({
                        code : 'login_1',
                        message : '가입되지 않은 ID'
                        })
                }
            }
        )

    } catch(err){ 
        console.log(err);
        res.status(400).json({
            message : '/login 에서 에러'
        });
    }   
}