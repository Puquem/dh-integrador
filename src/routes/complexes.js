// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '../../public/images/complexes'));
    },
    filename: (req, file, cb) => {
      cb(null, file.complexname + '-' + Date.now() + path.extname (file.originalname));
    }
});

// ************ Controller Require ************
const complexesController = require('../controllers/complexesController');

/* GET - Fields List*/
router.get('/', complexesController.index);

module.exports = router;