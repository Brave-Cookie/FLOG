const router = require('express').Router();
const controller = require('./project.controller');

// http://localhost:3000/api/project/create
router.post('/create', controller.create);


module.exports = router;