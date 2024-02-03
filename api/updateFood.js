import dbConnect from './database/dbConnection.js';
import Food from './models/Food.js';
import jwt from 'jsonwebtoken';

export default async (req, res) => {
  await dbConnect();

  if (req.method !== 'PUT') {
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

  const { _id, name, amount, protein, carbs, fats } = req.body;

  try {
    const updatedFood = await Food.findOneAndUpdate(
      { _id, user: userId }, 
      { name, amount, protein, carbs, fats },
      { new: true }
    );
    
    if (!updatedFood) {
      return res.status(404).json({ message: "Food entry not found or user mismatch" });
    }

    res.json(updatedFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
