import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config({ path: './config/.env' });

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

// Connecting to MongoDB using Mongoose
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Middleware
app.use(express.json());

// Routes
app.get('/api', (req, res) => {
  res.send('Hello from Express API!');
});

// ... other routes

// Start the server
app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});