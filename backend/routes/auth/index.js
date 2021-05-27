const router = require('express').Router();
const controller = require('./auth.controller');

// http://localhost:3000/api/auth/register
router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/createRoom', controller.createRoom);
router.get('/check/:roomCode', controller.checkCode);

module.exports = router;