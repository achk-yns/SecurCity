const express = require('express');
const router = express.Router();
const userController = require("../controllers/UserController");

// Create a new user
router.post('/users', userController.createUser);

// Get all users
router.get('/users', userController.getAllUsers);

// Get a user by Name
router.get('/users/:email', userController.getUserByemail);

// Update a user
router.put('/users/:email', userController.updateUser);

// Delete a user
router.delete('/users/:email', userController.deleteUser);

module.exports = router;
