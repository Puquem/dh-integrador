const path = require('path');
const {check} = require ("express-validator");

let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

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
	check('image1', 'image2', 'image3')
		.custom((value, { req }) => {
			// req.files es un array que puede llegar con objetos literales o vacío
			// Si viene con cosas, es pq ese campgit o pasó la validación de multer, es decir, viene con una o más imágenes
			// Acá no vale la pena validar la extensión pues eso ya lo hizo multer

			// Si req.files está vacío
			if (req.files.length == 0) {
				throw new Error('Elige imágenes descriptivas de la cancha o del complejo');
			} 
			
			// Si no te vinieron las 3 imágenes en total
			if (req.files.length < 3) {
				throw new Error('Alguna de las imágenes no concuerda con el formato establecido. Los formatos válidos son JPG, JPEG, PNG y GIF');
			}

			return true;
		}),
];