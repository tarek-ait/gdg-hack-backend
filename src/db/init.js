//  connection to the mongodb database, and exporting the initDatabase function 
import mongoose from 'mongoose'

export default async function connectDB () {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected: ",conn.connection.host)
    } catch (error) {
        console.log("MongoDB connection error ",error)
        process.exit(1)
    }
}
