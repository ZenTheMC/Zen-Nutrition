import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Conditionally load environment variables in non-production environments
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: './config/.env' });
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI)
      .then(mongoose => {
        console.log('Connected to MongoDB');
        return mongoose;
      })
      .catch(err => {
        console.error('Could not connect to MongoDB:', err);
        throw err;
      });
  }
  
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    // Handle the error here or log it
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

export default dbConnect;
