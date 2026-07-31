import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        default: "#0f172a",
    },
    category: {
        type: String,
        default: 'General'
    }
}, { timestamps: true });

const Note = mongoose.model("Note", noteSchema);

export default Note;