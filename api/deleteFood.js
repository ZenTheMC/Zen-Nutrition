import dbConnect from './database/dbConnection.js';
import Food from './models/Food.js';
import jwt from 'jsonwebtoken';

export default async (req, res) => {
  await dbConnect();

  if (req.method !== 'DELETE') {
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

  const { _id } = req.body; // or req.query / req.params based on how you're passing the _id

  try {
    const deletedFood = await Food.findOneAndDelete({ _id, user: userId });

    if (!deletedFood) {
      return res.status(404).json({ message: "Food entry not found or user mismatch" });
    }

    res.json({ message: "Food entry deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
