const express = require('express');
const forme_jController = require('../controllers/forme_jController');

const router = express.Router();


router.get('/', forme_jController.getAllforme_j);

module.exports = router;