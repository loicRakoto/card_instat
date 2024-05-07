// src/routes/regalaotraRoutes.js

const express = require('express');
const regalaotraController = require('../controllers/regalaotraController');

const router = express.Router();

router.get('/lastid', regalaotraController.getlastID);

router.get('/', regalaotraController.getAllRegalaotra);
router.get('/:id', regalaotraController.getRegalaotraById);
router.post('/', regalaotraController.createRegalaotra);
router.put('/:id', regalaotraController.updateRegalaotra);
router.delete('/:id', regalaotraController.deleteRegalaotra);


module.exports = router;
