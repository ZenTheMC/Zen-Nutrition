import React from 'react';
import { deleteFoodEntryFromDailyLog } from '../api/logAPI';

const FoodItem = ({ food, quantity, onDelete, _id, date }) => {
  const handleDelete = async () => {
    try {
      await deleteFoodEntryFromDailyLog(date, _id);
      onDelete();
    } catch (error) {
      console.error('Error deleting food entry', error);
    }
  };

  return (
    <div>
      <h2>{food.name}</h2>
      <p>Protein: {food.protein}g</p>
      <p>Carbs: {food.carbs}g</p>
      <p>Fats: {food.fats}g</p>
      <p>Quantity: {quantity}g</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default FoodItem;
