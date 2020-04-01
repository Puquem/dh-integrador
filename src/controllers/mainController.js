//const fs = require('fs');
//const path = require('path'); // path permite unificar la ruta de manera más cómoda

// ************ Function to Read an HTML File ************
function readHTML (fileName) {
	let htmlFile = fs.readFileSync(path.join(__dirname, `/../views/${fileName}.html`), 'utf-8');
	return htmlFile;
}

// Controller es la ruta que se exporta
const controller = {
	root: (req, res) => {
		res.render("index");
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
