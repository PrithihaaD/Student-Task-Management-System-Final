const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const swaggerSpec = require("./swagger.json");

const app = express();
app.get("/", (req, res) => {
    res.send("Student Task Management System API is running");
});

app.use(express.json());


// Swagger Docs - single source of truth is swagger.json
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// Serve the raw spec so it can be imported elsewhere (Postman, codegen, etc.)
app.get("/swagger.json", (req, res) => {
    res.json(swaggerSpec);
});


// API routes
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.get("/api/auth/test", (req, res) => {
    res.send("Auth route is working");
});

// Connect MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        console.log("MongoDB connected");

        app.listen(process.env.PORT || 5000, () => {
            console.log("Server running");
        });

    })
    .catch((error) => {

        console.log(
            "MongoDB connection error:",
            error
        );

    });
