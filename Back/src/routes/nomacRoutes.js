const express = require('express');
const nomacController = require('../controllers/nomacController');

const router = express.Router();

// Définir les routes pour les opérations CRUD
router.get('/', nomacController.getAllNomac);

module.exports = router;