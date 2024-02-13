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
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white">{food.name}</h2>
      <p className="text-gray-600 dark:text-gray-400">Protein: {food.protein}g</p>
      <p className="text-gray-600 dark:text-gray-400">Carbs: {food.carbs}g</p>
      <p className="text-gray-600 dark:text-gray-400">Fats: {food.fats}g</p>
      <p className="text-gray-600 dark:text-gray-400">Quantity: {quantity}g</p>
      <button
        onClick={handleDelete}
        className="mt-4 bg-red-500 dark:bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 dark:hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
};

export default FoodItem;
