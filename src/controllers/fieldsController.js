// Modelo de DB en Sequelize
const db = require('../database/models');
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

// Express Validator - middlewares
//const { validationResult } = require('express-validator'); 

const controller = {
    index: (req, res) => {
        db.Fields
            .findAll()
            .then(field => {
            return res.render('fields/index', { field });
        })
            .catch(() => 
                res.render('fields/404', { 
                    message: {
                        class: 'error-message',
                        title: 'Inexistente',
                        desc: 'El producto que buscas no existe'
                    }
            })
        );
    },
    show: (req, res) => {
        db.Fields
            .findByPk (
                req.params.id, {include: ['complex', 'category']
            })
            .then(field => {
            return res.render('fields/detail', { field });
        })
            .catch(() => 
                res.render('fields/404', { 
                    message: {
                        class: 'error-message',
                        title: 'Inexistente',
                        desc: 'El producto que buscas no existe'
                    }
            })
        );
    },
    create: (req, res) => {
        db.Categories
        .findAll()
        .then(categories => {
            return res.render('fields/create', { categories });
        })
        .catch(() => 
            res.render('fields/404', { 
                message: {
                    class: 'error-message',
                    title: 'Inexistente',
                    desc: 'No se ha encontrado la página'
                }
        })
    );   
    },
    store: (req, res) => {
        db.Fields
        .create (req.body= { 
        ...req.body.id, 
        ...req.body,
        image1: req.files[0].filename,
        image2: req.files[1].filename,
        image3: req.files[2].filename,
        })
        .then(fieldSaved => {
            fieldSaved.addCategory(req.body.category);
            fieldSaved.addComplex(req.body.complex);
            return res.redirect('/fields/'+ req.params.id);
        })
        .catch(()=> 
            res.render('fields/404', { 
                message: {
                    class: 'error-message',
                    title: 'Inexistente',
                    desc: 'No se pudo crear la cancha'
                }
        })
    );   
    },
    edit: (req, res) => {      
        db.Fields
        .findByPk (
            req.params.id, {include: ['complex', 'category']
        })
        .then(field => {
        return res.render('fields/edit', { field });
    })
        .catch(() => 
            res.render('fields/404', { 
                message: {
                    class: 'error-message',
                    title: 'Inexistente',
                    desc: 'El producto que buscas no existe'
                }
        })
    );
    },
    update: (req, res) => {
        req.body.id = req.params.id;
        /* Si nos llega imagen guardamos esa, de lo contrario mantenemos la anterior */
        req.body ={
            ...req.body,
            image1: req.files[0] ? req.files[0].filename: req.body.image1,
            image2: req.files[1] ? req.files[1].filename: req.body.image2,
            image3: req.files[2] ? req.files[2].filename: req.body.image3,
        }

        db.Fields
        .findByPk(req.params.id, {
            include: ['complex', 'category']
        })
        .then(field => {
            let category = field.category;
            category.map(cat => {
                sequelize
                    .query(`UPDATE FROM category_product WHERE product_id = ${product.id} AND category_id = ${cat.id} and complex_id = ${complex.id}`)
                    .then(() => console.log('Done!'))
                    .catch(() => console.log('Ups I did it again!'));
            });
            field.update();
            return res.status(200).redirect('/fields/'+ req.params.id);
        })
        .catch(() => 
        res.render('fields/404', { 
            message: {
                class: 'error-message',
                title: 'Inexistente',
                desc: 'No se ha podido modificar'
            }
        })
    );
    },
    destroy: (req, res) => {
        db.Fields
			.findByPk(req.params.id, {
				include: ['complex', 'category']
			})
			.then(field => {
				let category = field.category;
				category.map(cat => {
					sequelize
						.query(`DELETE FROM category_product WHERE product_id = ${product.id} AND category_id = ${cat.id}`)
						.then(() => console.log('Done!'))
						.catch(() => console.log('Ups I did it again!'));
				});
				field.destroy();
				return res.status(200).redirect('/fields');
			})
			.catch(() => 
            res.render('fields/404', { 
                message: {
                    class: 'error-message',
                    title: 'Inexistente',
                    desc: 'No se ha podido eliminar'
                }
        })
    );
    },
}

module.exports = controller;