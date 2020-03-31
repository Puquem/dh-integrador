// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const complexesController = require('../controllers/complexesController');

/* GET - Fields List*/
router.get('/', complexesController.index);

module.exports = router;