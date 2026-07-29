import express from 'express';
import { changeTaskStatus, deleteTask } from '../controllers/task.controller.js';

import authMiddleware from '../middleware/auth.middleware.js';

const taskRouter = express.Router();

taskRouter.use(authMiddleware)

taskRouter.patch('/:taskId', changeTaskStatus);
taskRouter.delete('/:taskId', deleteTask);

export default taskRouter;