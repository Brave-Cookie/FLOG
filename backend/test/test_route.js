const router = require('express').Router();
const jwt = require("jsonwebtoken");
// const models  = require('../models');


router.get('/', function(req, res, next) {

//---------------------------------------------------- 화면에 출력할 테스트 코드 ----------------------------------------------------

    const jwt_key = require('../config/config.json').JWT_SECRET;
    console.log(jwt_key)

    const user_id = 'hanjo8813';
    const user_name = '한재원';
    const user_email = 'hanjo8813@gmail.com'

    var mytoken = jwt.sign(
        {
            user_id,
            user_name,
            user_email
        }, 
        jwt_key
        );

    console.log(mytoken)

//----------------------------------------------------------------------------------------------------------------------------------

    res.render('test_screen');
});

module.exports = router;