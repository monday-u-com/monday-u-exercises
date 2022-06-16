export default function ErrorHandler(err, req, res, next) {
    if (err.length) {
        err.forEach(error => {
            console.log("Received error", error.message);
            console.log("Stacktrace", error.stack);
        });
        const status = 409;
        res.status(status).json({
            "status": status,
            "error": `${err}`
        });
    } else {
        console.log("Received error", err.message);
        console.log("Stacktrace", err.stack);
        if (res.headersSent)
            return next(err);
        const status = err.statusCode || 500;
        res.status(status).json({
            "status": status,
            "error": `${err.message || "Something went wrong"}`
        });
    }
}