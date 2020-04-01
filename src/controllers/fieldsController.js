// Modelo de DB en SQL
const db = require('../database/models');
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

//Express Validator - middlewares
const { validationResult } = require('express-validator'); 

const controller = {
    index: (req, res) => {
        db.Fields
            .findAll({include: ['categories']})
            .then(fields => {
                if(fields) {
                    return res.render('fields/index', { fields });
                } else {
                    return res.status(404).render('fields/404', {
                        message: {
                            class: 'error-message',
                            title: 'Inexistente',
                            desc: 'La página no existe'
                        }
                    });
                }
            })
    },
    show: (req, res) => {
        db.Fields
            .findByPk (
                req.params.id, {include: ['complexes', 'categories', 'grasses']
            })
            .then(fields => {
                /* 
                    $JAVI's-COMMENT:
                    En el caso que NO exista un Field con ese id, la consulta te retorna null.
                    Por ello aquí es donde se hace el res.render('fields/404').
                    NO en el CATCH.
                */
                if(fields) {
                    return res.render('fields/detail', { fields });
                } else {
                    return res.status(404).render('fields/404', {
                        message: {
                            class: 'error-message',
                            title: 'Inexistente',
                            desc: 'El producto que buscas no existe'
                        }
                    });
                }
            })
    },
    create: async (req, res) => {
     
        let fields = {include: ['complexes', 'categories', 'grasses']};
        let complexes = await db.Complexes.findAll();
        let categories = await db.Categories.findAll();
        let grasses = await db.Grasses.findAll();
    
        if (fields) {
            return res.render('fields/create', { complexes, categories, grasses });
        } else {
            return res.render('fields/404', {
                message: {
                    class: 'error-message',
                    title: 'No se ha encontrado la página',
                    desc: 'En este momento no se puede crear la cancha'
                }
            });
        }
    },
    store: (req, res) => {
        //Validaciones del Back
        let errors = (validationResult(req));

        //Si NO hay errores
        if (errors.isEmpty()) {

        db.Fields.create ({
            complexes_id: req.body.complexes_id,
            name: req.body.name,
            categories_id: req.body.categories_id,
            grasses_id: req.body.grasses_id,
            price: req.body.price,
            description: req.body.description,
            image1: req.files[0].filename,
            image2: req.files[1].filename,
            image3: req.files[2].filename
        })
        .then(fieldCreated => {
            /*
                $JAVI's-COMMENT:
                Siempre que haces un create() el then() recibe a ese registro que se creó.
                Por lo tanto al él le podés pedir su ID. Que es lo que necesitas para 
                redirigir al detalle del mismo, dado a que la URL es: /fields/:id
            */
            return res.redirect(`/fields/${fieldCreated.id}`);
        })
        .catch(()=> 
            res.render('fields/404', { 
                message: {
                    class: 'error-message',
                    title: 'Problemas',
                    desc: 'No se pudo crear la cancha'
                }
        })    
    );  
        //Si HAY errores
        } else {
            db.Complexes.findAll()
			.then(complexes => {
				db.Categories.findAll()
					.then(categories => {
                        return res.render('fields/create', { complexes, categories, grasses, errors: errors.errors});
                    })
            })
        }   
    },
    edit: async (req, res) => {   
    /*
        $JAVI's-COMMENT:
        Para que no hagás un encapsualmiento de then()'s podés usar el async / await
    */ 

    // AHORA
    let fields = await db.Fields.findByPk(req.params.id, {include: ['complexes', 'categories', 'grasses']});
    let complexes = await db.Complexes.findAll();
    let categories = await db.Categories.findAll();
    let grasses = await db.Grasses.findAll();

    // $JAVI's-COMMENT: cuando no se encuentra un Field con ese ID, "fields" será null
    if (fields) {
        return res.render('fields/edit', { fields, complexes, categories, grasses });
    } else {
        return res.render('fields/404', {
            message: {
                class: 'error-message',
                title: 'No se ha encontrado la cancha',
                desc: `La cancha con id ${req.params.id} no existe`
            }
        });
    }

    // =============================

    // ANTES
    // db.Fields
    //     .findByPk (req.params.id, {include: ['complexes', 'categories']})
    //     .then(fields => {
    //     	db.Complexes.findAll()
	// 		.then(complexes => {
	// 			db.Categories.findAll()
	// 				.then(categories => {
	// 					return res.render('fields/edit', { fields, complexes, categories });
	// 				})
	// 				.catch(()=> res.render('fields/404', { 
    //                     message: {
    //                         class: 'error-message',
    //                         title: 'Inexistente',
    //                         desc: 'No se ha encontrado la página'
    //                     }
    //             })
    //         );
    //         }) 
    //     })
	// 		.catch(()=> res.render('fields/404', { 
    //             message: {
    //                 class: 'error-message',
    //                 title: 'Inexistente',
    //                 desc: 'No se ha encontrado la página'
    //             }
    //     })
    //     );
    },
    update: (req, res) => {
        /*
            $JAVI's-COMMENT:
            No funcionaba porque no estabas enviando el "req.body.complexes_id" ni el "req.body.categories_id".
            Por lo tanto la consulta no se ejecutaba y en este caso SI entraba al catch.
            Fijate la vista fields/edit.ejs que ahí hice un par de comentarios.
        */    

        db.Fields.update ({
            complexes_id: req.body.complexes_id,
            name: req.body.name,
            categories_id: req.body.categories_id,
            grasses_id: req.body.grasses_id,
            price: req.body.price,
            description: req.body.description,
            image1: req.files[0] ? req.files[0].filename: req.body.image1,
            image2: req.files[1] ? req.files[1].filename: req.body.image2,
            image3: req.files[2] ? req.files[2].filename: req.body.image3
        }, { where: {
            id: req.params.id
        }
        })
        .then(() => {
            return res.redirect('/fields/' + req.params.id)
        })
        .catch(() => {
            return res.send('Catch');
        });
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
                    title: 'Problemas',
                    desc: 'No se ha podido eliminar'
                }
        })
    );
    },
}

module.exports = controller;