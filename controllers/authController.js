const userModel = require("../models/userModel");

module.exports.login = (req, res, next) => {
    res.render('auth/login');
}

module.exports.loginRequest = async (req, res, next) => {
    let errors = [];

    const { email, password } = req.body;

    // 
    const currentUser = await userModel.findOne({ email: email });

    if (!currentUser) {
        errors.push('field Email is WRONG');
        res.render('auth/login', {
            errors: errors,
            lastValueInput: req.body
        })
    } else {

        if (currentUser.password !== password) {
            errors.push('field PassWord is WRONG');
            res.render('auth/login', {
                errors: errors,
                lastValueInput: req.body
            })
        } else {
            res.redirect('/')
        }

    }
}