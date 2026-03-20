import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import userRouter from './routes/userRouter.js';


const app = express();
const PORT = process.env.PORT || 8000

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser())

connectDB()
app.get('/', (req, res) => {
    res.end('Home')
})
app.use('/api', userRouter);

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})