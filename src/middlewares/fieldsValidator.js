const path = require('path');
const {check} = require ("express-validator");

module.exports = [
	// Validando el complejo
	check('complex')
		.notEmpty().withMessage('El nombre del complejo es obligatorio').bail()
		.isLength({ min: 2 }).withMessage('Escribí un nombre válido'),

	// Validando dirección
	check('address')
		.notEmpty().withMessage('La dirección es obligatorio').bail()
		.isLength({ min: 10}).withMessage('Escribí una dirección válida y completa'),

	// Validando cancha
    check('name')
        .notEmpty().withMessage('El nombre de la cancha es obligatorio').bail()
        .isLength({ min: 2 }).withMessage('Escribí un nombre válido'),

    // Validando teléfono
    check('phone')   
		.notEmpty().withMessage('El teléfono es obligatorio').bail()
        .isInt({ min: 8 }).withMessage('Escribí un número de télefono válido sin espacios ni guiones'),
        
        // Validando teléfono
    check('price')   
        .notEmpty().withMessage('Ingresa un precio').bail()
        .isInt({ min: 1 }).withMessage('Escribí un precio válido'),

	// Validando password
	check('description')
		.notEmpty().withMessage('Escribí una descripción de la cancha').bail()
		.isLength({ min: 10 }).withMessage('Escribí una descripción completa'),
	
	// Validando avatar
	check('image1', 'image2', 'image3')
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