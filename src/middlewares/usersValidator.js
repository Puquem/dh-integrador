const path = require('path');
const {check} = require ("express-validator");

module.exports = [
	// Validando campo nombre
	check('name')
		.notEmpty().withMessage('El nombre es obligatorio').bail()
		.isLength({ min: 2 }).withMessage('Escribí un nombre válido'),

	// Validando campo apellido
	check('surname')
		.notEmpty().withMessage('El apellido es obligatorio').bail()
		.isLength({ min: 2 }).withMessage('Escribí un apellido válido'),

	// Validando email
	check('email')
		.notEmpty().withMessage('El email es obligatorio').bail()
		.isEmail().withMessage('Escribí un email válido'),

	// Validando password
	check('password')
		.notEmpty().withMessage('Escribí una contraseña').bail()
		.isLength({ min: 8 }).withMessage('La contraseña debe tener más de 8 caracteres'),
	
	// Validando avatar
	check('avatar')
		.custom((value, { req }) => {
			let acceptedExtensions = ['.jpg', '.jpeg', '.png', 'gif'];
			if (typeof req.file == 'undefined') {
				throw new Error('Elegí una imagen de perfil');
			} else if (req.file.originalname) {
				let fileExtension = path.extname(req.file.originalname);
				let extensionIsOk = acceptedExtensions.includes(fileExtension);
				if (!extensionIsOk) {
					throw new Error('Los formatos válidos son JPG, JPEG, PNG y GIF');
				}
			}
			return true;
		})
];