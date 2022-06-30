module.exports = function errorHandler(err, req, res, next) {
    console.log(err);
    if (res.headersSent) {
        return next(err);
    }
    const body = {
        success: false,
        endpoint: req.path,
        status: err.statusCode || 500,
        error: `${err.message || "Something went wrong"}`,
        data: null,
    };
    return res.status(500).json(body);
}