const guest = (req, res, next) => {

    if (res.locals.isAuthenticated) {
        res.redirect('/users/profile');
    }

    next();
}

module.exports = guest;