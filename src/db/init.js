//  connection to the mongodb database, and exporting the initDatabase function 
import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect()
        console.log("MongoDB connected: ",conn.connection.host)
    } catch (error) {
        console.log("MongoDB connection error ",error)
        process.exit(1)
    }
}