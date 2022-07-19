module.exports = function logger(req, res, next) {
  console.log(`new ${req.method} request at ${new Date()}`);
  next();
};
