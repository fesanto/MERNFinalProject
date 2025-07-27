import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
        console.error('Error: MONGO_URI not found in .env file');
        process.exit(1); 
    }

    try {
        const conn = await mongoose.connect(mongoURI); // Await for the connection to MongoDB
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); 
    }
};

export default connectDB;