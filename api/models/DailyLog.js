import mongoose from 'mongoose';

const dailyLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  foodEntries: [{
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    }
  }],
  totalMacros: {
    protein: Number,
    carbs: Number,
    fats: Number,
  },
  totalCalories: Number,
});

const DailyLog = mongoose.model('DailyLog', dailyLogSchema);

export default DailyLog;
