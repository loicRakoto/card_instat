const express = require('express');
const nationaliteController = require('../controllers/nationaliteController');

const router = express.Router();

// Définir les routes pour les opérations CRUD
router.get('/', nationaliteController.getAllNationalite);

module.exports = router;