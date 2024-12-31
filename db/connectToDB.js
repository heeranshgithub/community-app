import mongoose from 'mongoose'

let cachedDB = null
// This is a singleton pattern to avoid re-establishing connections
// every time a request is made (helpful during hot-reloading in development)

const connectToDB = async (url) => {
  if (cachedDB) return cachedDB

  try {
    const DB = await mongoose.connect(url, {
      useNewUrlParser: true, // Ensures that Mongoose uses the new MongoDB connection string parser.
      useUnifiedTopology: true, // Enables the new unified topology layer in the MongoDB Node.js driver.
    })

    cachedDB = DB
    console.log('Connected to MongoDB successfully!')
    return DB
  } catch (error) {
    console.log('MongoDB connection error: ', error)
    throw new Error('Failed to connect to MongoDB')
  }
}

export default connectToDB
