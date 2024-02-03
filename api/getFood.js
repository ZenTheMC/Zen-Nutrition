import dbConnect from './database/dbConnection.js';
import Food from './models/Food.js';
import jwt from 'jsonwebtoken';

export default async (req, res) => {
  await dbConnect();

  if (req.method !== 'GET') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "No authorization token provided" });
  }

  const token = authorization.split(" ")[1];
  let userId;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.userId;
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const foods = await Food.find({ user: userId });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
