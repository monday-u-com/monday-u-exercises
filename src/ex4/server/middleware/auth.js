module.exports = function auth(req, res, next) {
  
    let error = Error();
    error.statusCode = 403;
    error.message = "Not authorized";

    if (req.headers.size === 0) {
        throw error;
    }
    if (!req.headers.authorization) {
        throw error;
    }
    if (req.headers.authorization.indexOf("Bearer") === -1) {
        throw error;
    }

    let token = req.headers.authorization.split("Bearer ");
    if (token[1] !== 'may_the_force_be_with_you') {
        throw error;
    }
    next();

};