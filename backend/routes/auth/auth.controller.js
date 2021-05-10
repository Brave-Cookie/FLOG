const models  = require('../../models');

// 
exports.register = async (req, res, next) => {
    var user_info = req.body ;
    //delete user_info.passwordConfirm;

    console.log(user_info)

    models.user_info.create({
        user_id : user_info.id,
        user_pw : user_info.password,
        user_email : user_info.email,
        user_name : user_info.name
    })
    console.log('삽입 성공')
}
