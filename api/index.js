import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
// To use ES6 import/export syntax in the backend, you must include .js at the end of file names that are locally imported(not from libraries)
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import foodRoutes from './routes/foodRoutes.js';

dotenv.config({ path: './config/.env' });

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

// Connecting to MongoDB using Mongoose
mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));

// Routes
app.get('/api', (req, res) => {
  res.send('Hello from Express API!');
});
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);

// ... other routes

// Start the server
app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});