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
          const { date } = req.query; // Assuming the query parameter is named 'date'
          
          try {
            const dailyLog = await DailyLog.findOne({ user: userId, date: new Date(date) }).populate('foodEntries.food');
            if (!dailyLog) return res.status(404).json({ message: "Daily log not found" });

            // Initialize macros and calories
            let totalProtein = 0, totalCarbs = 0, totalFats = 0;

            dailyLog.foodEntries.forEach(entry => {
              // Adjusted calculation to account for the logged quantity
              const proteinPer100g = entry.food.protein * (entry.quantity / entry.food.amount);
              const carbsPer100g = entry.food.carbs * (entry.quantity / entry.food.amount);
              const fatsPer100g = entry.food.fats * (entry.quantity / entry.food.amount);

              totalProtein += proteinPer100g;
              totalCarbs += carbsPer100g;
              totalFats += fatsPer100g;
            });

            // Calculate total calories
            const totalCalories = (totalProtein + totalCarbs) * 4 + totalFats * 9;

            // Append total macros and calories to the response
            const response = {
              ...dailyLog.toObject(),
              totalMacros: {
                protein: totalProtein,
                carbs: totalCarbs,
                fats: totalFats,
              },
              totalCalories,
            };

            res.json(response);
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
          break;
        }
        case 'PUT': {
          const { date, foodEntryId, newQuantity } = req.body;
          
          try {
            // Find the daily log for the given date and user
            const dailyLog = await DailyLog.findOne({ user: userId, date: new Date(date) });
            if (!dailyLog) return res.status(404).json({ message: "Daily log not found" });
            
            // Find the specific food entry in the daily log
            const foodEntry = dailyLog.foodEntries.id(foodEntryId);
            if (!foodEntry) return res.status(404).json({ message: "Food entry not found" });
            
            // Update the quantity of the food entry
            foodEntry.quantity = newQuantity;
            
            // Save the updated daily log
            await dailyLog.save();
            res.json({ message: "Food entry updated successfully", dailyLog });
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
          break;
        }        
        case 'DELETE': {
            const { date, foodEntryId } = req.body; // Include foodEntryId in the body for targeted deletion
            
            try {
              if (foodEntryId) {
                // Deleting a specific food entry from the daily log
                const result = await DailyLog.updateOne(
                  { user: userId, date: new Date(date) },
                  { $pull: { foodEntries: { _id: foodEntryId } } } // Adjust based on your schema
                );
                if (result.modifiedCount === 0) return res.status(404).json({ message: "Food entry not found or already deleted" });
                res.json({ message: "Food entry deleted successfully" });
              } else {
                // Existing logic for deleting the entire daily log
                const result = await DailyLog.deleteOne({ user: userId, date: new Date(date) });
                if (result.deletedCount === 0) return res.status(404).json({ message: "Daily log not found or already deleted" });
                res.json({ message: "Daily log deleted successfully" });
              }
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
