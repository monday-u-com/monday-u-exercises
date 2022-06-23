function logger(req, res, next) {
    console.log(`--> New request ${req.method} ${req.path} at ${new Date()}`);
    next();
}


// logger info msg on command line
module.exports = {
    logger
}