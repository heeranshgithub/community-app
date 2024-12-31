import express from 'express'
import treeRouter from './routes/treeRoutes.js'
import userRouter from './routes/userRoutes.js'
import connectToDB from './db/connectToDB.js'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.use(express.json())

app.use('/api/v1', treeRouter) // have to change this url
app.use('/api/v1/user', userRouter)

const start = async () => {
  try {
    await connectToDB(process.env.MONGODB_URI)
    app.listen(process.env.PORT || 5001, () => {
      console.log(`Server is listening on port ${process.env.PORT || 5001}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
