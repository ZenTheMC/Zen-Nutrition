import User from './models/User.js';
import jwt from 'jsonwebtoken';
import dbConnect from './database/dbConnection.js';

export default async (req, res) => {
  await dbConnect();

  // Dynamically set the allowed origin based on the request origin
  const allowedOrigins = ['https://zen-nutrition.vercel.app', 'http://localhost:5173'];
  const requestOrigin = req.headers.origin;
  if (allowedOrigins.includes(requestOrigin)) {
    res.setHeader('Access-Control-Allow-Origin', requestOrigin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Immediately return a 200 for OPTIONS preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      console.log("Received request body:", req.body);
      const { username, email, password } = req.body;
      console.log("Before toLowerCase, email:", email);
      const user = new User({ username, email: email.toLowerCase(), password });
      await user.save();
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.status(201).json({ token });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
