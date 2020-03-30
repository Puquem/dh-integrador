const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const apiController = require('../controllers/apiController');

// ************ API users ************
router.get('/users', apiController.users);
router.get('/users/:id', apiController.userId);

// ************ API fields ************
router.get('/fields', apiController.fields);
router.get('/fields/:id', apiController.fieldId);

module.exports = router;