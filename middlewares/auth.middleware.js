'use strict';

const AuthService = require('../services/auth.service');

const myAuth = function (req, res, next) {
    console.log(req.session);
    if (!req.session.user) {
        // verify authetication to continue
        const { userId } = req.body;    
        req.session.user = {};
        AuthService.checkAuthetication(userId).then((validateUser) => {
            if (validateUser.success) {
                req.session.user = validateUser.data;
                next();
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
    } else {
        next();
    }
}
module.exports = myAuth;