const path = require('path');
const {check} = require ("express-validator");

module.exports = [
	// // Validando el complejo
	// check('complex')
	// 	.notEmpty().withMessage('El nombre del complejo es obligatorio').bail()
	// 	.isLength({ min: 2 }).withMessage('Escribí un nombre válido'),

	// Validando nombre de la cancha
    check('name')
        .notEmpty().withMessage('El nombre de la cancha es obligatorio').bail()
        .isLength({ min: 2 }).withMessage('Escribe un nombre válido'),

    // Validando precio
    check('price')   
        .notEmpty().withMessage('El precio es obligatorio').bail()
        .isInt({ min: 1 }).withMessage('Escribe un precio válido'),

	// Validando descripción
	check('description')
		.notEmpty().withMessage('La descripción es obligatoria').bail()
		.isLength({ min: 10 }).withMessage('Escribe una descripción completa'),
	
	// Validando imágenes
	//REVISAR!
	check('image1')
		.custom((value, { req }) => {
			let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif' ];
			if (typeof req.files == 'undefined') {
				throw new Error('Elige una imagen descriptiva de la cancha o del complejo');
			} else if (req.files.filename) {
				let fileExtension = path.extname(req.files.filename);
				let extensionIsOk = acceptedExtensions.includes(fileExtension);
				if (!extensionIsOk) {
					throw new Error('Los formatos válidos son JPG, JPEG, PNG y GIF');
				}
			}
			return true;
		}),

		check('image2')
		.custom((value, { req }) => {
			let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif' ];
			if (typeof req.files == 'undefined') {
				throw new Error('Elige una imagen descriptiva de la cancha o del complejo');
			} else if (req.files.filename) {
				let fileExtension = path.extname(req.files.filename);
				let extensionIsOk = acceptedExtensions.includes(fileExtension);
				if (!extensionIsOk) {
					throw new Error('Los formatos válidos son JPG, JPEG, PNG y GIF');
				}
			}
			return true;
		}),

		check('image3')
		.custom((value, { req }) => {
			let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif' ];
			if (typeof req.files == 'undefined') {
				throw new Error('Elige una imagen descriptiva de la cancha o del complejo');
			} else if (req.files.filename) {
				let fileExtension = path.extname(req.files.filename);
				let extensionIsOk = acceptedExtensions.includes(fileExtension);
				if (!extensionIsOk) {
					throw new Error('Los formatos válidos son JPG, JPEG, PNG y GIF');
				}
			}
			return true;
		}),
];