import React from 'react';
import { deleteFoodEntryFromDailyLog } from '../api/logAPI';

const FoodItem = ({ id, name, protein, carbs, fats, quantity, onDelete }) => {
  const handleDelete = async () => {
    try {
      await deleteFoodEntryFromDailyLog(id);
      onDelete();
    } catch (error) {
      console.error('Error deleting food entry', error);
    }
  };
  
  return (
    <div>
      <h2>{name}</h2>
      <p>Protein: {protein}g</p>
      <p>Carbs: {carbs}g</p>
      <p>Fats: {fats}g</p>
      <p>Quantity: {quantity}g</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default FoodItem;