const path = require('path');
const {check} = require ("express-validator");

module.exports = [
	// Validando email
	check('email')
		.notEmpty().withMessage('El email es obligatorio').bail()
		.isEmail().withMessage('Escribe un email válido'),

	// Validando password
	check('password')
		.notEmpty().withMessage('La contraseña es obligatoria').bail()
		.isLength({ min: 8 }).withMessage('La contraseña debe tener más de 8 caracteres'),
];