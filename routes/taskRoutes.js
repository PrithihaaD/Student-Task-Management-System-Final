const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/Task");

const router = express.Router();


// POST - Create Task
router.post("/", async (req, res) => {
    try {
        const task = await Task.create(req.body);

        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});


// GET - Get All Tasks

 // GET - Get Tasks with Search, Filtering, Sorting and Pagination
router.get("/", async (req, res) => {
    try {
        const filter = {};

        // Filter by status
        if (req.query.status) {
            filter.status = req.query.status;
        }

        // Filter by priority
        if (req.query.priority) {
            filter.priority = req.query.priority;
        }

        // Search by task title
        if (req.query.search) {
            filter.title = {
                $regex: req.query.search,
                $options: "i"
            };
        }

        // Sorting
        const sortBy = req.query.sortBy || "createdAt";
        const order = req.query.order === "asc" ? 1 : -1;

        // Pagination
        const page = Math.max(1, parseInt(req.query.page, 10) || 1);
        const limit = Math.min(
            100,
            Math.max(1, parseInt(req.query.limit, 10) || 10)
        );
        const skip = (page - 1) * limit;

        const totalTasks = await Task.countDocuments(filter);

        const tasks = await Task.find(filter)
            .sort({ [sortBy]: order })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            totalTasks,
            currentPage: page,
            totalPages: Math.ceil(totalTasks / limit),
            tasks
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});



// GET - Get Task by ID
router.get("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid task ID"
            });
        }

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// PUT - Update Task
router.put("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid task ID"
            });
        }

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});


// DELETE - Delete Task
router.delete("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid task ID"
            });
        }

        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task deleted successfully",
            task: task
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


module.exports = router;