//const fs = require('fs');
//const path = require('path'); // path permite unificar la ruta de manera más cómoda

// Modelo de DB en SQL
const db = require('../database/models');
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

// ************ Function to Read an HTML File ************
function readHTML (fileName) {
	let htmlFile = fs.readFileSync(path.join(__dirname, `/../views/${fileName}.html`), 'utf-8');
	return htmlFile;
}

// Controller es la ruta que se exporta
const controller = {
	root: (req, res) => {
        db.Categories
            .findAll()
            .then(categories => {
                if(categories) {
                    return res.render('index', { categories });
                } else {
                    return res.status(404).render('error', {
                        message: {
                            class: 'error-message',
                            title: 'Inexistente',
                            desc: 'La página no existe'
                        }
                    });
                }
            })
    },
	contact: (req, res) => {
		res.render("contact");
	},
	about: (req, res) => {
		res.render("about");
	},
	faqs: (req, res) => {
		res.render("faqs");
	},
}

module.exports = controller;
