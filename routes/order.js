const express = require('express');
const controllers = require('../contrillers/order');
const router = express.Router();

router.post('/', controllers.getAll)

router.post('/', controllers.create);


module.exports = router;