<<<<<<< HEAD
function errorHandler(err, req, res, next) {
    console.log("Received error", err.message);
    console.log("Stacktrace", err.stack);
=======
function handleError(err, req, res, next) {
    console.log("Error was Happend ", err.message);

>>>>>>> ex5
    if(res.headersSent){
        return next(err)
    }
    let status = err.statusCode || 500;
    res.status(status).json({
        "status": status,
<<<<<<< HEAD
        "error": `${err.message || "Something went wrong"}`
    })
}
module.exports = {
    errorHandler
=======
        "error": `${err.message || "Error While load-container the app"}`
    })
}
module.exports = {
    handleError
>>>>>>> ex5
}