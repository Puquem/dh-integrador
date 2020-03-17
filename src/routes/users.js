// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

/* GET - login. */
router.get('/login', usersController.login);

/* GET - user */
router.get('/create', usersController.user);

module.exports = router;