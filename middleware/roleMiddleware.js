const ApiError = require("../utils/ApiError");

// Usage: authorize("admin") or authorize("student", "admin")
const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        // authMiddleware should have run first and set req.user
        if (!req.user) {
            return next(
                ApiError.unauthorized("Access denied. Please log in")
            );
        }

        // user's role is not in the allowed list
        if (!allowedRoles.includes(req.user.role)) {
            return next(
                ApiError.forbidden(
                    "Access denied. You do not have permission to perform this action"
                )
            );
        }

        next();
    };
};

module.exports = { authorize };
