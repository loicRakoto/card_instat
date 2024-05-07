// src/routes/itemRoutes.js

const express = require('express');
const itemController = require('../controllers/itemController');

const router = express.Router();

// Définir les routes pour les opérations CRUD
router.get('/', itemController.getAllItems);
router.get('/:id', itemController.getItemById);
router.post('/', itemController.createItem);
router.put('/:id', itemController.updateItem);
router.delete('/:id', itemController.deleteItem);

module.exports = router;
