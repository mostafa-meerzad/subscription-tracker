const errorMiddleware = (err, req, res, next) => {

    try {
        let error = {...err}
        err.message = error.message;

        console.error(error);

        // mongoose bad objectId
        if (error.name === "CastError") {
            const message = "Resource not found.";
            error = new Error(message);
            error.statusCode = 404;
        }
        // mongoose duplicate key
        if (error.code === 1100) {
            const message = "Duplicated field value entered.";
            error = new Error(message);
            error.statusCode = 400
        }

        // mongoose validation error
        if (error.name === "ValidationError") {
            const message = Object.values(err.errors).map((e) => e.message).join(", ");
            error = new Error(message);
            error.statusCode = 400
        }
        res.status(error.statusCode || 500).json({success: false, error: error.message || "server error"});
    } catch (err) {
        next(err);
    }
}
export default errorMiddleware;