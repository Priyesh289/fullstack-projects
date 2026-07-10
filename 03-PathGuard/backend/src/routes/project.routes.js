import { deleteProject, editProject, projectCreate, showAllProject, showProject, taskCreate } from "../controllers/project.controller.js";
import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";

const projectRouter = express.Router();


projectRouter.use(authMiddleware)

projectRouter.post('/create-project', projectCreate);
projectRouter.post('/:projectId/tasks', taskCreate);
projectRouter.get('/:projectId', showProject);
projectRouter.get('/', showAllProject);
projectRouter.delete("/:projectId",deleteProject)
projectRouter.patch('/:projectId', editProject)

export default projectRouter