import express from 'express';
import Food from '../models/Food.js';
import requireAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', requireAuth, async (req, res) => { /* ... */ });
router.get('/:userId', requireAuth, async (req, res) => { /* ... */ });

// POST route to add a new food entry
router.post('/', async (req, res) => {
  const { name, amount, protein, carbs, fats, user } = req.body;
  try {
    const newFood = new Food({ name, amount, protein, carbs, fats, user });
    await newFood.save();
    res.status(201).json(newFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET route to retrieve all food entries for a user
router.get('/:userId', async (req, res) => {
  try {
    const foods = await Food.find({ user: req.params.userId });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;
