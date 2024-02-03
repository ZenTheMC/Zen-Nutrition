// Vercel API endpoint serverless function
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: '../config/.env' });

export default async (req, res) => {
  try {
    // Use mongoose to connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Handle the authentication logic here

    res.status(200).send('Auth endpoint');
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).send('Internal Server Error');
  }
};