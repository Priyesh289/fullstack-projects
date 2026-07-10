import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    userId:{ type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
        type: String, required: true,
        enum: ['active', "hold", 'done'],
        default:'active'
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }
    ]
}, {
    timestamps: true,
})

const Project = mongoose.model('Project', projectSchema);

export default Project