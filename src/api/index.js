var express = require('express');
const multiparty = require('connect-multiparty')
const MultipartyMiddleware = multiparty({uploadDir:"./images"})
const path = require('path')
const fs = require('fs');
const { success } = require('../message');
const { port } = require('../commons/port');
var router = express.Router();
router.use('/user', require("./user"));
router.use('/menu', require('./menu'))
router.use('/comment', require('./comment'))
router.use('/notification', require('./notification'))
router.use('/product', require('./product'))

module.exports = router;