const express = require('express');
const controllers = require('../controllers/position');
const router = express.Router();

router.get('/:categoryId', controllers.getByCategoryId)

router.post('/', controllers.create);

router.delete('/:id', controllers.remove)

router.patch('/:id', controllers.update);


module.exports = router;