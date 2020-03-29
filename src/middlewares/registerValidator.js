const path = require('path');
const {check} = require ("express-validator");

module.exports = [
	// Validando campo nombre
	check('name')
		.notEmpty().withMessage('El nombre es obligatorio').bail()
		.isLength({ min: 2 }).withMessage('Escribe un nombre válido'),

	// Validando campo apellido
	check('surname')
		.notEmpty().withMessage('El apellido es obligatorio').bail()
		.isLength({ min: 2 }).withMessage('Escribe un apellido válido'),

	// Validando email
	check('email')
		.notEmpty().withMessage('El email es obligatorio').bail()
		.isEmail().withMessage('Escribe un email válido'),

	// Validando password
	check('password')
		.notEmpty().withMessage('La contraseña es obligatoria').bail()
		.isLength({ min: 8 }).withMessage('La contraseña debe tener más de 8 caracteres'),
	
	// Validando avatar
	check('avatar')
		.notEmpty().withMessage('El avatar es obligatorio').bail()
		.custom((value, { req }) => {
			let acceptedExtensions = ['.jpg', '.jpeg', '.png', 'gif'];
			if (req.file.originalname) {
				let fileExtension = path.extname(req.file.originalname);
				let extensionIsOk = acceptedExtensions.includes(fileExtension);
				if (!extensionIsOk) {
					throw new Error('Los formatos válidos son JPG, JPEG, PNG y GIF');
				}
			}
			return true;
		})
];