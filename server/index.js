import express from 'express'
import cors from 'cors'
import { connectToDB } from './dbConfig/dbConfig.js'
import blogRoute from './routes/blogRoute.js';
import userRoute from './routes/userRoutes.js'
import { config } from 'dotenv'
config()

const app = express()

app.use(express.json());
app.use(cors());

app.use('/api/blogs' , blogRoute);
app.use('/api/user' ,userRoute);

app.use('*' , () => {
    console.log('page not found')
})

const PORT = process.env.PORT || 8000;


app.listen(PORT , async() => {
    await connectToDB()
  console.log('listening at 8000')
})