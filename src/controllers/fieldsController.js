// Modelo de DB en Sequelize
const db = require('../database/models');
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

//Express Validator - middlewares
//const { validationResult } = require('express-validator'); 

const controller = {
    index: (req, res) => {
        db.Fields
            .findAll()
            .then(fields => {
            return res.render('fields/index', { fields });
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
                req.params.id, {include: ['complexes', 'categories']
            })
            .then(fields => {
            return res.render('fields/detail', { fields });
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
		db.Complexes.findAll()
			.then(complexes => {
				db.Categories.findAll()
					.then(categories => {
						return res.render('fields/create', { complexes, categories });
					})
					.catch(()=> res.render('fields/404', { 
                        message: {
                            class: 'error-message',
                            title: 'Inexistente',
                            desc: 'No se ha encontrado la página'
                        }
                })
            );
			})
			.catch(()=> res.render('fields/404', { 
                message: {
                    class: 'error-message',
                    title: 'Inexistente',
                    desc: 'No se ha encontrado la página'
                }
        })
        );
    },
    
    //NO FUNCIONA EL REDIRECCIONAMIENTO, DEBERÍA REDIRECCIONAR AL DETALLE DEL PROD.
    //PERO REDIRECCIONA AL LISTADO DE PRODUCTOS. 
    store: (req, res) => {
        db.Fields.create ({
            complexes_id: req.body.complexes_id,
            name: req.body.name,
            categories_id: req.body.categories_id,
            price: req.body.price,
            description: req.body.description,
            image1: req.files[0].filename,
            image2: req.files[1].filename,
            image3: req.files[2].filename
        })
        .then(() => {
            return res.redirect('fields')
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
            req.params.id, {include: ['complexes', 'categories']})
        .then(fields => {
        	db.Complexes.findAll()
			.then(complexes => {
				db.Categories.findAll()
					.then(categories => {
						return res.render('fields/edit', { fields, complexes, categories });
					})
					.catch(()=> res.render('fields/404', { 
                        message: {
                            class: 'error-message',
                            title: 'Inexistente',
                            desc: 'No se ha encontrado la página'
                        }
                })
            );
            }) 
        })
			.catch(()=> res.render('fields/404', { 
                message: {
                    class: 'error-message',
                    title: 'Inexistente',
                    desc: 'No se ha encontrado la página'
                }
        })
        );
    },

    //NO FUNCIONA EL REDIRECCIONAMIENTO Y NO HACE EL UPDATE 
    update: (req, res) => {
        db.Fields.update ({
            complexes_id: req.body.complexes_id,
            name: req.body.name,
            categories_id: req.body.categories_id,
            price: req.body.price,
            description: req.body.description,
            image1: req.files[0] ? req.files[0].filename: req.body.image1,
            image2: req.files[1] ? req.files[1].filename: req.body.image2,
            image3: req.files[2] ? req.files[2].filename: req.body.image3
        },{ where: {
                id: req.params.id
        }
        })
        .then(() => {
            return res.redirect('fields/' + req.params.id)
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
        db.Fields.destroy({
            where:{
                id: req.params.id
            }
        })
        .then((updated) =>{
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