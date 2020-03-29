const {check} = require ("express-validator");

module.exports = [
	// Validando email
	check('email')
		.notEmpty().withMessage('El email es obligatorio').bail()
		.isEmail().withMessage('Escribe un email válido'),

	// Validando password
	check('password')
		.notEmpty().withMessage('La contraseña es obligatoria').bail()
		.isLength({ min: 6 }).withMessage('La contraseña debe tener al menos de 6 caracteres'),
];