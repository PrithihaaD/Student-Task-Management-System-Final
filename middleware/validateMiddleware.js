const ApiError = require("../utils/ApiError");

/**
 * validate({ field: (value, data) => "error message" or null })
 *
 * Usage:
 *   router.post("/", validate(taskCreateRules), controller.create);
 *   router.get("/", validate(listQueryRules, "query"), controller.list);
 *
 * Bad input         -> 400 with field details.
 * Bad/throwing rule -> 500 (fail closed). Never silently let data through.
 */
const validate = (rules, source = "body") => {
    return (req, res, next) => {
        // Guard: rules must be a plain object of functions.
        if (!rules || typeof rules !== "object" || Array.isArray(rules)) {
            return next(
                new ApiError(
                    500,
                    "Server misconfiguration: invalid validation rules"
                )
            );
        }

        const data = req[source] || {};
        const errors = [];

        for (const field of Object.keys(rules)) {
            const rule = rules[field];

            if (typeof rule !== "function") {
                return next(
                    new ApiError(
                        500,
                        `Server misconfiguration: rule for "${field}" is not a function`
                    )
                );
            }

            let message;
            try {
                message = rule(data[field], data);
            } catch (err) {
                // A broken rule must never crash the app or skip validation.
                return next(err);
            }

            // A rule must return a string (error) or null/undefined (ok).
            if (
                message !== undefined &&
                message !== null &&
                typeof message !== "string"
            ) {
                return next(
                    new ApiError(
                        500,
                        `Server misconfiguration: rule for "${field}" returned an invalid value`
                    )
                );
            }

            if (typeof message === "string" && message.length > 0) {
                errors.push({ field, message });
            }
        }

        if (errors.length > 0) {
            return next(new ApiError(400, "Validation failed", errors));
        }

        next();
    };
};

module.exports = { validate };
