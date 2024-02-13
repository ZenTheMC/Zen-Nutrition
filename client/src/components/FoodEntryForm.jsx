import React, { useState } from 'react';
import { addFood, updateFood } from '../api/foodAPI';
import { addFoodToDailyLog, updateFoodEntryInDailyLog } from '../api/logAPI';

const FoodEntryForm = ({ date, foodEntryId, mode, onSubmitSuccess, selectedFoodId }) => {
  const [name, setName] = useState('');
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
  
    if ((mode === 'addFood' || mode === 'updateFood') && !name.trim()) {
      newErrors.name = 'Food name is required.';
    }
    if ((mode === 'addFood' || mode === 'updateFood') && protein < 0) {
      newErrors.protein = 'Protein must be 0 or more.';
    }
    if ((mode === 'addFood' || mode === 'updateFood') && carbs < 0) {
      newErrors.carbs = 'Carbs must be 0 or more.';
    }
    if ((mode === 'addFood' || mode === 'updateFood') && fats < 0) {
      newErrors.fats = 'Fats must be 0 or more.';
    }
    if (mode === 'addFood' || mode === 'updateFood') {
      if (amount !== "" && parseFloat(amount) <= 0) {
        newErrors.amount = 'Amount must be greater than 0.';
      }
    }
    if ((mode === 'addEntry' || mode === 'updateEntry') && quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0.';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (mode === 'addFood') {
        const foodData = {
          name,
          protein: parseFloat(protein) || 0,
          carbs: parseFloat(carbs) || 0,
          fats: parseFloat(fats) || 0,
          ...(amount !== "" && { amount: parseFloat(amount) }),
        };
        await addFood(foodData);
      } else if (mode === 'updateFood') {
        await updateFood(selectedFoodId, { protein, carbs, fats });
      } else if (mode === 'addEntry') {
        const entryData = {
          food: selectedFoodId,
          quantity: parseInt(quantity) || 100,
        };
        await addFoodToDailyLog(date, entryData);
      } else if (mode === 'updateEntry') {
        await updateFoodEntryInDailyLog(date, foodEntryId, { quantity });
      }
      onSubmitSuccess();
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  function getButtonText(mode) {
    switch (mode) {
      case 'addFood': return 'Add Food to Database';
      case 'updateFood': return 'Update Food Details';
      case 'addEntry': return 'Add Entry to Log';
      case 'updateEntry': return 'Update Log Entry';
      default: return 'Submit';
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-4">
      {(mode === 'addFood' || mode === 'updateFood') && (
        <div className="mb-4">
          <label htmlFor="food-name" className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">
            Food Name
          </label>
          <input
            id="food-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter food name"
            required={mode === 'addFood'}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        {(mode === 'addFood' || mode === 'updateFood') && (
          <>
            <div className="mb-4">
              <label htmlFor="protein" className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">
                Protein (g)
              </label>
              <input
                id="protein"
                type="number"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                placeholder="Protein"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.protein && <p className="text-red-500 text-xs italic">{errors.protein}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="carbs" className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">
                Carbs (g)
              </label>
              <input
                id="carbs"
                type="number"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                placeholder="Carbs"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.carbs && <p className="text-red-500 text-xs italic">{errors.carbs}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="fats" className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">
                Fats (g)
              </label>
              <input
                id="fats"
                type="number"
                value={fats}
                onChange={(e) => setFats(e.target.value)}
                placeholder="Fats"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.fats && <p className="text-red-500 text-xs italic">{errors.fats}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="amount" className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">
                Amount (Optional)
              </label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.amount && <p className="text-red-500 text-xs italic">{errors.amount}</p>}
            </div>
          </>
        )}
        {(mode === 'addEntry' || mode === 'updateEntry') && (
          <div className="col-span-2">
            <label htmlFor="quantity" className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">
              Quantity (g)
            </label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.quantity && <p className="text-red-500 text-xs italic">{errors.quantity}</p>}
          </div>
        )}
        <div className="col-span-2">
          <button
            type="submit"
            className="bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out w-full"
          >
            {getButtonText(mode)}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FoodEntryForm;
