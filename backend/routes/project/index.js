const router = require('express').Router();
const controller = require('./project.controller');

// http://localhost:3000/api/project/create
router.post('/create', controller.create);
router.get('/list/:user_id',controller.list)
router.post('/issue', controller.issue)
module.exports = router;