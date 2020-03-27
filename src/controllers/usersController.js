// Login Middlewares
const bcrypt = require('bcrypt');

// Modelo de DB en Sequelize
const db = require('../database/models');
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

// Express Validator - Middlewares
//const { validationResult } = require('express-validator'); 

const controller = {
    index: (req, res) => {
        db.Users.findAll()
        .then (users => {
            if(users) {
                return res.render('users/index', { users });
            } else {
                return res.status(404).render('users/404', { 
                    message: {
                        class: 'error-message',
                        title: 'Inexistente',
                        desc: 'El usuario que buscas no existe'
                    }
                });
            }
        })
    },
    show: (req, res) => {
        db.Users.findByPk(req.params.id)
        .then( user => {
            if (user) {
                res.render('users/detail', { user:user });
            } else {
                res.render('users/404', { 
                    message: {
                        class: 'error-message',
                        title: 'Inexistente',
                        desc: 'El usuario que buscas no existe'
                    }
                });
            }
        })
    },
    create: (req, res) => {
        res.render('users/create');
    },
    store: (req, res) => {
     	//let errors = validationResult(req);
        db.Users.create ({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password = bcrypt.hashSync(req.body.password, 10),
            avatar: req.file.filename
        })
        .then(userCreated => {
            return res.redirect('/users/login');
        })
    }, 
    loginForm: (req, res) => {
        res.render('users/login');
    },
    login: (req, res) => {
        db.Users.findOne({
            //Buscar usuario por ID
            where: { email : req.body.email}})
            // Si encuentra al usuario
        .then (oneUser => {
        if (oneUser) {
            // Compara las contraseñas
            if (bcrypt.compareSync(req.body.password, oneUser.password)) {
                //Elimina la contraseña porque no es un dato que pueda guardar
                delete oneUser.password;
                //Guarda el usuario en Session
                req.session.user = oneUser;
                res.locals.user = req.session.user;
                res.locals.isAuthenticated = true;
                //Setea la cookie           
                if (req.body.remember) {
                    res.cookie('userIdCookie', oneUser.id, { maxAge: 60000 * 60 });
                }
                //Redirige el usuario al perfil
                return res.redirect('/users/profile');
            } else {
                return res.render('users/404', { 
                    message: {
                        class: 'error-message',
                        title: 'Inválido',
                        desc: 'Credenciales inválidas'
                    }
                });
            }
        //Si no encuentra el usuario
        } else {
            return res.render('users/404', { 
                message: {
                    class: 'error-message',
                    title: 'Inexistente',
                    desc: 'No hay usuarios registrados con ese email'
                }
            });
        }
    })     
    },
    logout: (req, res) => {
        // Destruyela session
        req.session.destroy();
        // Destruye la cookie
        res.cookie('remember', { maxAge: -1 });
        res.redirect('/');
    },
    profile: (req, res) => {
        db.Users.findByPk(req.session.user.id)
        .then(user => {
            return res.render('users/detail', { user:user });
        })   
    },
    edit: (req, res) => {
        db.Users.findByPk(req.params.id)
        .then( users => {
            if (users) {
                return res.render('users/edit', { users });
            } else {
                return res.status(404).render('users/404', { 
                    message: {
                        class: 'error-message',
                        title: 'Inexistente',
                        desc: 'El usuario que buscas no existe'
                    }
                });
            }
        })
    },
    update: (req, res) => {
        db.Users.update ({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            avatar: req.body.avatar = req.file ? req.file.filename : req.body.avatar
        }, { where: {
            id: req.params.id
        }
        })
        .then(userUpdated => {
            return res.redirect('/users/' + req.params.id)
        })
        .catch(() => {
            return res.send('Catch');
            // res.render('fields/404', { 
            //     message: {
            //         class: 'error-message',
            //         title: 'Inexistente',
            //         desc: 'No se ha podido modificar'
            //     }
            // })
        });
    },
    destroy: (req, res) => {
        db.Users.destroy({
            where:{
                id: req.params.id
            }
        })
        .then((updated) => {
        return res.status(200).redirect('/users');
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
