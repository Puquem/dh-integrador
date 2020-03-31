// Modelo de DB en SQL
const db = require('../database/models');
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

const controller = {
    index: async (req, res) => {

        let complexes = await db.Complexes.findAll({include: ['fields']});
        let count= await db.Fields.count({
            where: {
                complexes_id = complexes.id
            }
        });

        if (complexes) {
                return res.render('complexes/index', {complexes, count});
            } else {
                return res.status(404).render('complexes/404', {
                    message: {
                        class: 'error-message',
                        title: 'Inexistente',
                        desc: 'La página no existe'
                    }
                });
            }
    }
}

module.exports = controller;