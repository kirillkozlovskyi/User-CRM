const express = require('express');
const controllers = require('../contrillers/auth');
const router = express.Router();

router.post('/login', controllers.login)

router.post('/register', controllers.register);


module.exports = router;