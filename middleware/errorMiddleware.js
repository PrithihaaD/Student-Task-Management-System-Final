
const ApiError = require("../utils/ApiError");

const notFound = (req, res, next) => {
    next(
        new ApiError(
            404,
            `Route not found: ${req.method} ${req.path}`
        )
    );
};

const errorHandler = (error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
        message:
            statusCode >= 500
                ? "Internal server error"
                : error.message
    });
};

module.exports = { notFound, errorHandler };
