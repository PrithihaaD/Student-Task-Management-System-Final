// A custom error that carries an HTTP status code (like 404 or 403)
class ApiError extends Error {
    constructor(statusCode, message, details = null) {
        super(message);
        this.name = "ApiError";
        this.statusCode = statusCode;
        this.details = details;
        this.isOperational = true; // a "known" error we created on purpose
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message, details) {
        return new ApiError(400, message, details);
    }

    static unauthorized(message) {
        return new ApiError(401, message);
    }

    static forbidden(message) {
        return new ApiError(403, message);
    }

    static notFound(message) {
        return new ApiError(404, message);
    }

    static conflict(message) {
        return new ApiError(409, message);
    }
}

module.exports = ApiError;
