const express = require('express');
const router = express.Router();
const coordController = require('../controllers/CoordinatesController');

// Route for creating a new coordinate
router.post('/coordinates', coordController.createCoordinates);

// Route for getting all coordinates
router.get('/coordinates', coordController.getAllCoordinates);

module.exports = router;
