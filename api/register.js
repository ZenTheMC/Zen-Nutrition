// Vercel API endpoint serverless function
import User from './models/User.js';
import jwt from 'jsonwebtoken';
import dbConnect from './database/dbConnection.js';

export default async (req, res) => {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      // Directly use the plain password; it will be hashed by the model's pre save middleware
      const { username, email, password } = req.body;
      const user = new User({ username, email: email.toLowerCase(), password });
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
