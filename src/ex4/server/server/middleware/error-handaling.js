module.exports = function errorHandler(err, req, res, next) {
  console.log('Received error', err.message);
  console.log('Stacktrace', err.stack);

  const status = err.statusCode || 500;
  const message = err.message || 'Somthing went wrong';
  res.status(status).json(message);
};
