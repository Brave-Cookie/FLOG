const router = require('express').Router();
const controller = require('./project.controller');

// http://localhost:3000/api/project/create
router.post('/create', controller.create);
router.get('/list/:user_id',controller.list)
router.post('/issue/create', controller.issueCreate)
router.get('/issue/list/:project_id', controller.issueList)
router.get('/member/search/:user_name', controller.searchMember)
router.post('/member/add', controller.addsMember)
module.exports = router;