import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    default: 100
  },
  protein: {
    type: Number,
    required: true
  },
  carbs: {
    type: Number,
    required: true
  },
  fats: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Food = mongoose.model('Food', foodSchema);

export default Food;
