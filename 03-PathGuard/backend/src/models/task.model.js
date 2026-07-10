import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    text: { type: String },
    completed: {
        type: Boolean,
        default: false
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }
});

const Task = mongoose.model('Task', taskSchema);

export default Task;