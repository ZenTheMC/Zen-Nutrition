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
    <form onSubmit={handleSubmit}>
      {(mode === 'addFood' || mode === 'updateFood') && (
        <>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Food Name"
            required={mode === 'addFood'}
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </>
      )}
      {(mode === 'addFood' || mode === 'updateFood') && (
        <>
          <input
            type="number"
            value={protein}
            onChange={(e) => setProtein(parseFloat(e.target.value))}
            placeholder="Protein (g)"
            required
          />
          {errors.protein && <p className="text-red-500">{errors.protein}</p>}
          <input
            type="number"
            value={carbs}
            onChange={(e) => setCarbs(parseFloat(e.target.value))}
            placeholder="Carbs (g)"
            required
          />
          {errors.carbs && <p className="text-red-500">{errors.carbs}</p>}
          <input
            type="number"
            value={fats}
            onChange={(e) => setFats(parseFloat(e.target.value))}
            placeholder="Fats (g)"
            required
          />
          {errors.fats && <p className="text-red-500">{errors.fats}</p>}
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount (Optional)"
          />
          {errors.amount && <p className="text-red-500">{errors.amount}</p>}
        </>
      )}
      {(mode === 'addEntry' || mode === 'updateEntry') && (
        <>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            placeholder="Quantity (g)"
            required
          />
          {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
        </>
      )}
      <button type="submit">
        {getButtonText(mode)}
      </button>
    </form>
  );
};

export default FoodEntryForm;
