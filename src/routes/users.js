const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/images/avatars'));
    },
    filename: (req, file, cb) => {
        cb(null, 'avatar-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage,
    // Esto valida uno a uno los archivos subidos
    fileFilter: (req, file, cb) => {    
      let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
      let fileExtension = path.extname(file.originalname);
      let extensionIsOk = acceptedExtensions.includes(fileExtension);
      // Si la extensión de ese archivo es OK, lo subirá :(
      // Por lo menos ahora solo sube imágenes
      if (extensionIsOk) {
        cb(null, true);
      } else {
        // Si no es la extensión esperada, no los sube
        cb(null, false);
      }
    }
  });

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

// ************ Middlewares ************
const userRoute = require('../middlewares/userRoute');
const guestRoute = require('../middlewares/guestRoute');
const registerValidator= require('../middlewares/registerValidator');
const loginValidator= require('../middlewares/loginValidator');

/* GET - users list */
router.get('/', usersController.index);

/* GET - register */
router.get('/create', guestRoute, usersController.create);

/* POST - register */
router.post('/', upload.single('avatar'), registerValidator, usersController.store);

/* GET - login */
router.get('/login', guestRoute, usersController.loginForm);

/* POST - login */
router.post('/login', loginValidator, usersController.login);

// /* GET - profile */
router.get('/profile', userRoute, usersController.profile);

// /* GET - logout */
router.get('/logout', usersController.logout);

// /* GET - users profile */
router.get('/:id', usersController.show);

// /* GET - edit users profile */
router.get('/:id/edit', usersController.edit);

// /* PUT - edit users profile */
router.put('/:id', upload.single('avatar'), usersController.update);

// /* DELETE - delete users profile */
router.delete('/:id', usersController.destroy);

module.exports = router;