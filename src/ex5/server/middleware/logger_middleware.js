module.exports = function logger_middleware(req, res, next) {
  console.log(`--> New request ${req.method} ${req.path} at ${new Date()}`);
  next();
};
