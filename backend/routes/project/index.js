const router = require('express').Router();
const controller = require('./project.controller');

// http://localhost:3000/api/project/create
router.post('/create', controller.create);                          //프로젝트 생성
router.get('/list/:user_id',controller.list)                        //프로젝트 리스트
router.post('/issue/create', controller.issueCreate)                //이슈등록
router.get('/issue/list/:project_id', controller.issueList)         //이슈리스트
router.get('/member/search/:user_name', controller.searchMember)    //참여자 검색
router.post('/member/add', controller.addMember)                    //참여자 추가


module.exports = router;