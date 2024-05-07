const express = require('express');
const sheet1Controller = require('../controllers/sheet1Controller');

const router = express.Router();

router.get('/', sheet1Controller.getAllSheet);
router.get('/search/:id', sheet1Controller.search);

module.exports = router;