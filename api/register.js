// Vercel API endpoint serverless function
import dotenv from 'dotenv';
import mongoose from 'mongoose';
// To use ES6 import/export syntax in the backend, you must include .js at the end of file names that are locally imported(not from libraries)
import User from './models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Remove entire dotenv line when deploying to vercel and add environment variables to deployment
dotenv.config({ path: './config/.env' });

mongoose.connect(process.env.MONGO_URI);

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 8);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
