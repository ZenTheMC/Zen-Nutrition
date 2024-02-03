// Vercel API endpoint serverless function
import User from './models/User.js'; // Adjust the import path as necessary
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from './database/dbConnection.js'; // Adjust the import path as necessary

export default async (req, res) => {
  // Ensure the database connection is established
  await dbConnect();

  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Login failed. Check authentication credentials' });
      }

      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate a token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

      // Respond with the token
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    // Respond with method not allowed if not a POST request
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
