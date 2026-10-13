
const Task = require("../models/Task");

const getDashboard = async (req, res) => {
    try {
        const totalTasks = await Task.countDocuments();
        const pendingTasks = await Task.countDocuments({
            status: "Pending"
        });
        const inProgressTasks = await Task.countDocuments({
            status: "In Progress"
        });
        const completedTasks = await Task.countDocuments({
            status: "Completed"
        });

        res.status(200).json({
            totalTasks,
            pendingTasks,
            inProgressTasks,
            completedTasks
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch dashboard",
            error: error.message
        });
    }
};

module.exports = { getDashboard };
