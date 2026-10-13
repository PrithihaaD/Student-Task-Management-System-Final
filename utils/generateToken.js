const jwt = require("jsonwebtoken");

// Token lives for 1 hour - identical to the existing login behavior
const TOKEN_EXPIRY = "1h";

const generateToken = (user) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: TOKEN_EXPIRY
        }
    );
};

module.exports = generateToken;
