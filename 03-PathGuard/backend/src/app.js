import express from 'express'
import authRouter from './routes/auth.routes.js';
import cookieParser from "cookie-parser";
import projectRouter from './routes/project.routes.js';
import noteRoute from './routes/note.routes.js';
import profileRouter from './routes/user.routes.js';

const app = express();

app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
    res.end("Home Page")
})
app.use('/api', authRouter);
app.use('/api/v1/profile', profileRouter)
app.use('/api/v1/projects', projectRouter);
app.use('/api/notes', noteRoute)




export default app;