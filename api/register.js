// Vercel API endpoint serverless function
import User from './models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from './database/dbConnection.js';

export default async (req, res) => {
  await dbConnect();

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
