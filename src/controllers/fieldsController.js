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
        req.body= { 
        ...req.body.id, 
        ...req.body,
        image1: req.files[0].filename,
        image2: req.files[1].filename,
        image3: req.files[2].filename,
        }

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
                    desc: 'El producto que buscas no existe',
                }
            });
        }
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
        productsModel.update(req.body);

        res.redirect('/fields/' + req.params.id);
    },
    destroy: (req, res) => {
        productsModel.destroy(req.params.id);
        res.redirect('/fields');
    },
}

module.exports = controller;