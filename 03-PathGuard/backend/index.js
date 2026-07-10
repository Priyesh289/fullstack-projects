import dotenv from 'dotenv'
import app from './src/app.js'
import connectDB from './src/config/db.js'
dotenv.config()


const PORT = process.env.PORT || 8000

app.listen(PORT, async() => {
    console.log(`running server on http://localhost:${PORT}`);
    await connectDB()
})
