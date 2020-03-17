const JsonModel = require('../models/jsonModel');

const productsModel = new JsonModel('products');

const controller = {
    index: (req, res) => {
        let products = productsModel.all();
        res.render('fields/index', { products });
    },
    show: (req, res) => {
        let product = productsModel.find(req.params.id);

        if (product) {
            res.render('fields/detail', { product });
        } else {
            res.render('fields/404', { 
                message: {
                    class: 'error-message',
                    title: 'Inexistente',
                    desc: 'El producto que buscas no existe'
                }
            });
        }
    },
    create: (req, res) => {
        res.render('fields/create');
    },
    store: (req, res) => {
        req.body.image = req.file ? req.file.filename : '';
        let productId = productsModel.save(req.body);

        res.redirect('/fields/'+ productId);
    },
    edit: (req, res) => {
        let product = productsModel.find(req.params.id);

        if (product) {
            res.render('fields/edit', { product });
        } else {
            res.render('fields/404', { 
                message: {
                    class: 'error-message',
                    title: 'Inexistente',
                    desc: 'El producto que buscas ya no existe, nunca existió y tal vez nunca exista.'
                }
            });
        }
    },
    update: (req, res) => {
        req.body.id = req.params.id;
        /* Si nos llega imagen guardamos esa, de lo contrario mantenemos la anterior */
        req.body.image = req.file ? req.file.filename : req.body.oldImage;
        productsModel.update(req.body);

        res.redirect('/fields/' + req.params.id);
    },
    destroy: (req, res) => {
        productsModel.destroy(req.params.id);
        res.redirect('/fields');
    },
}

module.exports = controller;

// const ubicacionProductosJSON = path.join(__dirname, "../data/products.json") //lee el directorio, arma una ruta del archivo
// let contenidoProductosJSON = fs.readFileSync (ubicacionProductosJSON,'utf-8');
// let fields = JSON.parse(contenidoProductosJSON);

// function leerArchivo (fileName) {
// 	let leerArchivo = fs.readFileSync(path.join(__dirname, `/../data/${fileName}.json`), 'utf-8');
// 	return leerArchivo;
// }

// // controller es la ruta que se exporta
// const controller = {
// 	index:(req, res) => {
// 		// Me traigo todos los productos
		
// 		// Renderizo la vista con los productos
// 		res.render('fields/index',{fields});
// 	},

// 	create: (req, res) => {
// 		res.render("fields/create");
// 	},

// 	show: (req, res) => {
// 		let canchas=JSON.parse(leerArchivo("products"));
// 		let idCancha=req.params.id;
// 		let cancha=canchas[idCancha];
// 		res.render('fields/show',{cancha});
// 	},

// 	store: (req, res) => {

// 		let arrayDeProductos = [] ;

// 		//si el archivo no está vacío
// 		if (contenidoProductosJSON != " "){
		
// 		//tomo el contenido y lo convierto en un formato de array de objetos literales
// 			arrayDeProductos = JSON.parse(contenidoProductosJSON);
// 		};
	

// 		//creo ID de producto (en primer lugar) y le sumo el id a los productos consiguientes
// 		req.body = {
// 			id: arrayDeProductos.length == 0 ? 1 : arrayDeProductos.length + 1,
// 			...req.body,
// 			image1: req.files[0].filename,
// 			image2: req.files[1].filename,
// 			image3: req.files[2].filename,
// 		}

// 		//inserto producto nuevo
// 		arrayDeProductos.push(req.body);

// 		//convierto el array de productos en JSON formato legible
// 		let contenidoGuardar = JSON.stringify(arrayDeProductos,null, " ");

// 		//guardo array completo en el archivo JSON
// 		fs.writeFileSync (ubicacionProductosJSON, contenidoGuardar);

// 		//mensaje de éxito
// 		res.send ("Producto creado con éxito");
// 	},

// 	// //delete: (req, res) => {
// 	// 	let arrayProducts = JSON.parse(productsJSON);
// 	// 	let deleteProduct = arrayProducts.filter(function (aProduct){
// 	// 		return aProduct.id != req.params.id;
// 	// 	}) 

// 	// 	fs.writeFileSync (productsJSON, JSON.stringify (deleteProduct, null, " "));
// 	// 	res.redirect ("fields")
// 	// },

// };

// module.exports = controller 
