import express from 'express'
import { findUser, loginUser, logoutUser, userRegister } from '../controllers/userController.js';
import auth from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/register', userRegister);
userRouter.post('/login', loginUser);
userRouter.get('/logout', logoutUser);
userRouter.get('/user', auth, findUser);

export default userRouter