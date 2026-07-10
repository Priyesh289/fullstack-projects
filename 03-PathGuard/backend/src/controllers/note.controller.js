import Note from "../models/notes.model.js";

export const createNotes = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user._id;

        if (!title && !description) {
            return res.status(400).json({
                success: false,
                message: "Please provide both title and description"
            })
        }

        const note = await Note.create({
            title,
            description,
            userId: userId
        })

        return res.status(201).json({
            success: true,
            message: "notes created successfully",

        })

    } catch (error) {
        console.log(error);
    }
}

export const showNotes = async (req, res) => {
    try {
        const { notesId } = req.params;

        const userId = req.user._id;

        const notes = await Note.findById(notesId);

        if (!notes) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        if (!notes.userId.equals(userId)) {
            return res.status(403).json({
                success: false,
                message: "User not authorized"
            });
        }
        return res.status(200).json({
            success: true,
            data: notes
        })
    } catch (error) {
        console.log(error)
    }
}

export const editNotes = async (req, res) => {
    try {
        const { notesId } = req.params;
        const { title, description } = req.body;
        const userId = req.user._id;

        const notes = await Note.findById(notesId);

        if (!notes) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        if (!notes.userId.equals(userId)) {
            return res.status(403).json({
                success: false,
                message: "User not authorized"
            });
        }

        if (title !== undefined) {
            notes.title = title
        }

        if (description !== undefined) {
            notes.description = description
        }

        await notes.save();

        return res.status(201).json({
            success: true,
            message: "notes has updated"
        })
    } catch (error) {
        console.log(error)
    }
}

export const deleteNotes = async (req, res) => {
    try {
        const { notesId } = req.params;

        const userId = req.user._id;

        const notes = await Note.findById(notesId);

        if (!notes) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        if (!notes.userId.equals(userId)) {
            return res.status(403).json({
                success: false,
                message: "User not authorized"
            });
        }

        await notes.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Note deleted successfully"
        })
    } catch (error) {
        console.log(error)
    }
}

export const showAllNotes = async (req, res) => {
    try {
        const userId = req.user._id;

        const notes = await Note.find({
            userId: userId
        })

        if (!notes) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: notes
        })

    } catch (error) {
        console.log(error)
    }
}