import express from 'express'
import {
    createNotes, showNotes, editNotes, deleteNotes, showAllNotes
}
    from '../controllers/note.controller.js';
import authMiddleware from "../middleware/auth.middleware.js";

const noteRoute = express.Router();

noteRoute.use(authMiddleware);

noteRoute.get('/', showAllNotes);
noteRoute.post('/create-notes', createNotes);
noteRoute.get('/:notesId', showNotes);
noteRoute.patch('/:notesId', editNotes);
noteRoute.delete('/:notesId', deleteNotes);

export default noteRoute;