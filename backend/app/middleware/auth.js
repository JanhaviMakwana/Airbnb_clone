const jwt = require('jsonwebtoken');
const config = require('../config/app.config');

module.exports = (req, res, next) => {
  /*   console.log(req); */
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        req.isAuth = false;
        return next();
    }

    const token = authHeader.split(' ')[1];
    /* console.log(token); */

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, config.appKey);
        /* console.log(decodedToken); */

    } catch (err) {
        req.isAuth = false;
        return next();
    }

    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }

    req.userId = decodedToken.userId;
    req.isAuth = true;
    next();

}