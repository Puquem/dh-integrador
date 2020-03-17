const fs = require('fs');
const path = require('path'); // path permite unificar la ruta de manera más cómoda

const controller = {
	 
	login: (req, res) => {
		res.render("users/login");
	},

	user: (req, res) => {
		res.render('users/create');
	},
};

module.exports = controller 
