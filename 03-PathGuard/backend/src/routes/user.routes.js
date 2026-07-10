import express from 'express'
import authMiddleware from '../middleware/auth.middleware.js';
import { getProfile, editProfile } from '../controllers/profile.controller.js';

const profileRouter = express.Router();

// profile.routes.js
profileRouter.get("/", authMiddleware, getProfile);
profileRouter.patch("/", authMiddleware, editProfile);

export default profileRouter;