// Vercel API endpoint serverless function
import dbConnect from './database/dbConnection.js';
import DailyLog from './models/DailyLog.js';
import jwt from 'jsonwebtoken';
// Needed for the GET request even though Food is not called in code
import Food from './models/Food.js';
// Needed for the GET request even though Food is not called in code

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
            // For creating or updating a daily log
            const { date, foodEntries } = req.body;
            let query = { user: userId, date: new Date(date) };
            let update = { $setOnInsert: { user: userId, date: new Date(date) }, $addToSet: { foodEntries: { $each: foodEntries } } };
            let options = { new: true, upsert: true, setDefaultsOnInsert: true };

            try {
                const dailyLog = await DailyLog.findOneAndUpdate(query, update, options);
                res.status(201).json(dailyLog);
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
            break;
        }
        case 'GET': {
            // For retrieving a daily log by date
            const { date } = req.query; // Assuming the query parameter is named 'date'
            
            try {
              const dailyLog = await DailyLog.findOne({ user: userId, date: new Date(date) }).populate('foodEntries.food');
              if (!dailyLog) return res.status(404).json({ message: "Daily log not found" });
              res.json(dailyLog);
            } catch (error) {
              res.status(500).json({ message: error.message });
            }
            break;
        }
        case 'DELETE': {
            // For deleting a daily log by date
            const { date } = req.body; // Assuming the body contains a 'date' field
            
            try {
                const result = await DailyLog.deleteOne({ user: userId, date: new Date(date) });
                if (result.deletedCount === 0) return res.status(404).json({ message: "Daily log not found or already deleted" });
                res.json({ message: "Daily log deleted successfully" });
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
            break;
        }
        default:
            res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
