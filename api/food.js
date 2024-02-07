import dbConnect from './database/dbConnection.js';
import Food from './models/Food.js';
import jwt from 'jsonwebtoken';

export default async (req, res) => {
    await dbConnect();
    
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: "No authorization token provided" });

    const token = authorization.split(" ")[1];
    let userId;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.userId;
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    
    switch (req.method) {
        case 'POST': {
            const { name, amount, protein, carbs, fats } = req.body;
            try {
                const newFood = new Food({ name, amount, protein, carbs, fats, user: userId });
                await newFood.save();
                res.status(201).json(newFood);
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
            break;
        }
        case 'GET': {
            const { searchQuery } = req.query;
            
            let query = { user: userId };
            
            if (searchQuery) {
              query = { ...query, name: { $regex: searchQuery, $options: "i" } };
            }
          
            try {
              const foods = await Food.find(query);
              res.json(foods);
            } catch (error) {
              res.status(500).json({ message: error.message });
            }
            break;
        }
        case 'PUT': {
            const { _id, name, amount, protein, carbs, fats } = req.body;
            try {
                const updatedFood = await Food.findOneAndUpdate(
                    { _id, user: userId }, 
                    { name, amount, protein, carbs, fats },
                    { new: true }
                );
                if (!updatedFood) return res.status(404).json({ message: "Food entry not found or user mismatch" });
                res.json(updatedFood);
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
            break;
        }
        case 'DELETE': {
            const { _id } = req.body;
            try {
                const deletedFood = await Food.findOneAndDelete({ _id, user: userId });
                if (!deletedFood) return res.status(404).json({ message: "Food entry not found or user mismatch" });
                res.json({ message: "Food entry deleted successfully" });
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
            break;
        }
        default:
            res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
