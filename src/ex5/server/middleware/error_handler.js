function handleError(err, req, res, next) {
    console.log("Error was Happend ", err.message);
    if(res.headersSent){
        return next(err)
    }
    let status = err.statusCode || 500;
    res.status(status).json({
        "status": status,
        "error": `${err.message || "Error While load-container the app"}`
    })
}
module.exports = {
    handleError
}