import Task from "../models/task.model.js";


export const changeTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params;
        const user = req.user._id;

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(403).json({
                success: false,
                message: "User not authorized"
            });
        }

        task.completed = !task.completed;
        await task.save();

        return res.status(200).json({
            success: true,
            message: "Task status has changed",
            task
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const deleteTask = async (req, res) => {
    try {

        const { taskId } = req.params;
        const user = req.user._id;

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(403).json({
                success: false,
                message: "User not authorized"
            });
        }

        await task.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}