module.exports = function logger(req, res, next) {
    console.log(`--> New request ${req.method} ${req.path} at ${new Date()}`);
    next();
}