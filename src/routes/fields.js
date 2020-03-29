const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/images/fields'));
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname (file.originalname));
    }
});

const upload = multer({ storage });

// ************ Controller Require ************
const fieldsController = require('../controllers/fieldsController.js');

// ************ Middlewares ************
const fieldsValidator= require('../middlewares/fieldsValidator');

/* GET - Fields List*/
router.get('/', fieldsController.index);

/* GET - Create Field Form*/
router.get('/create', fieldsController.create);

/* POST - Create Field Form*/
router.post('/', upload.any(), fieldsValidator, fieldsController.store);

/* GET - Field Detail*/
router.get('/:id', fieldsController.show);

/* GET - Edit Field Form */
router.get('/:id/edit', fieldsController.edit);

/* PUT - Edit Field Form */
router.put('/:id', upload.any(), fieldsController.update);

/*DELETE - Edit Field Detail*/
router.delete('/:id', fieldsController.destroy);

module.exports = router;


