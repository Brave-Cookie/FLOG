const router = require('express').Router();
const controller = require('./auth.controller');

// http://localhost:3000/api/auth/register
router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/createRoom', controller.createRoom);
router.post('/check/:roomCode', controller.createRoom);

module.exports = router;