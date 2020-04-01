// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

/* GET - home page. */
router.get('/', mainController.root);

/* GET - contacto */
router.get('/contact', mainController.contact);

/* GET - contacto */
router.get('/about', mainController.about);

/* GET - preguntas frecuentes */
router.get('/faqs', mainController.faqs);

module.exports = router;