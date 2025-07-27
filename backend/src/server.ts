import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB(); // Connect to the database first
        app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`)); // Then start the Express server to listen for requests

    } catch (error) {
        console.error('Failed to connect to the database. Server is not starting.');
        process.exit(1); 
    }
};

startServer();
