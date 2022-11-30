'use strict';
const AuthService = require('../services/auth.service');

const login = async (req, res, next) => {
    const { userId } = req.body;

    req.session.regenerate(function (err) {
        if (err) next(err)
        // store user information in session
        req.session.user = {};
        AuthService.checkAuthetication(userId).then((validateUser) => {
            if (validateUser.success) {
                req.session.user = validateUser.data;
                // save the session before redirection to ensure page
                // load does not happen before session is saved
                req.session.save(function (err) {
                    if (err) return next(err)
                    res.status(200).send({success: true, data: validateUser.data });
                })
            } else {
                // The user has either not set up MFA or they have disabled it
                let myError = new Error();
                myError.statusCode = 401;
                myError.message = "Failed on validate your credentials! Please, log in the application again!";
                res.status(401).send(myError);
            }
        }).catch((err) => {
            next(err);
        });
    })

    // @todo: regenerate the session, which is good practice to help guard against forms of session fixation
    
}

const logout = async (req, res, next) => {
    // logout logic
    console.log("logout");

    // clear the user from the session object and save.
    // this will ensure that re-using the old session id
    // does not have a logged in user
    req.session.user = null
    req.session.save(function (err) {
        if (err) next(err);
        // regenerate the session, which is good practice to help
        // guard against forms of session fixation
        req.session.regenerate(function (err) {
            if (err) next(err)
            res.status(200).send({success: true});
        })
    });
};

module.exports = {
  login, logout
};
