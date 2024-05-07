const express = require('express');
const lchefController = require('../controllers/lchefController');

const router = express.Router();

// Définir les routes pour les opérations CRUD
router.get('/', lchefController.getAllLchef);

module.exports = router;