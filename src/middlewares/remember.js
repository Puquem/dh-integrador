// Modelo de DB en Sequelize
const db = require('../database/models');
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

const remember = (req, res, next) => {
    
    res.locals.isAuthenticated = false;

    if (req.session.user) {
        res.locals.isAuthenticated = true;
        res.locals.user = req.session.user;

    } else if (req.cookies.userIdCookie) {
        let oneUser = db.Users.findByPk(req.cookies.userIdCookie);
        req.session.user = oneUser
        }

     // Si es inválido, borramos la cookie
     res.cookie('userIdCookie', null, { maxAge: -1 });
        
    next();
}

module.exports = remember;