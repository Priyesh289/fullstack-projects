import Task from "../models/task.model.js";
import Project from "../models/project.model.js";

export const projectCreate = async (req, res) => {
    try {
        const { title, description } = req.body;
        const user = req.user._id

        if (!title && !description) {
            return res.status(400).json({
                success: false,
                message: "Please provide title and description"
            })
        }

        const project = await Project.create({
            title,
            description,
            userId: user
        })

        return res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: project
        })

    } catch (error) {
        console.log(error)
    }
}

export const taskCreate = async (req, res) => {
    try {
        const { text } = req.body;
        const { projectId } = req.params;

        const task = await Task.create({
            text,
            project: projectId
        })

        // Add task ID to project's tasks array
        await Project.findByIdAndUpdate(projectId, {
            $push: {
                tasks: task._id
            }
        });

        return res.status(201).json({
            success: true,
            message: "Task created successfully",
        });

    } catch (error) {
        console.log(error)
    }
}

export const showProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const user = req.user._id;

        const project = await Project.findById(projectId)
            .populate("tasks", "text completed -_id");

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        if (project.userId.toString() !== user.toString()) {
            return res.status(403).json({
                success: false,
                message: "User not authorized"
            });
        }

        return res.status(200).json({
            success: true,
            data: project
        });

    } catch (error) {
        console.log(error)
    }
}

export const editProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { title, description } = req.body;
        const user = req.user._id;

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            })
        }
        if (project.userId.toString() !== user.toString()) {
            return res.status(403).json({
                success: false,
                message: "User not authorized"
            });
        }

        if (title !== undefined) {
            project.title = title;
        }

        if (description !== undefined) {
            project.description = description;
        }

        await project.save();

        res.status(200).json({
            success: true,
            data: project,
        })

    } catch (error) {
        console.log(error)
    }
}

export const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const user = req.user._id;

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project Not found'
            })
        }

        if (project.userId.toString() !== user.toString()) {
            return res.status(403).json({
                success: false,
                message: "User not authorized"
            });
        }
        await project.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Project deleted successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const showAllProject = async (req, res) => {
    try {
        const user = req.user._id;

        const project = await Project.find({
            userId: user
        });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project Not found'
            })
        }

        return res.status(200).json({
            success: true,
            data: project
        })
    } catch (error) {
        console.log(error)
    }
}