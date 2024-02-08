import React, { useState } from 'react';
import { addFoodToDailyLog, updateFoodEntryInDailyLog } from '../api/logAPI';

const FoodEntryForm = ({ date, foodEntryId, mode, onSubmitSuccess }) => {
  const [name, setName] = useState('');
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);
  const [quantity, setQuantity] = useState(100);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (mode === 'add' && !name.trim()) newErrors.name = 'Food name is required.';
    if (protein < 0) newErrors.protein = 'Protein cannot be negative.';
    if (carbs < 0) newErrors.carbs = 'Carbs cannot be negative.';
    if (fats < 0) newErrors.fats = 'Fats cannot be negative.';
    if (quantity <= 0) newErrors.quantity = 'Quantity must be greater than 0.';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;

    try {
      if (mode === 'add') {
        await addFoodToDailyLog(date, { name, protein, carbs, fats, quantity });
      } else if (mode === 'update') {
        await updateFoodEntryInDailyLog(date, foodEntryId, { protein, carbs, fats, quantity });
      }
      onSubmitSuccess();
    } catch (error) {
      console.error('Error submitting food entry', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {mode === 'add' && <>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Food Name" required />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </>}
      <input type="number" value={protein} onChange={(e) => setProtein(e.target.value)} placeholder="Protein" required />
      {errors.protein && <p className="text-red-500">{errors.protein}</p>}
      <input type="number" value={carbs} onChange={(e) => setCarbs(e.target.value)} placeholder="Carbs" required />
      {errors.carbs && <p className="text-red-500">{errors.carbs}</p>}
      <input type="number" value={fats} onChange={(e) => setFats(e.target.value)} placeholder="Fats" required />
      {errors.fats && <p className="text-red-500">{errors.fats}</p>}
      <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" required />
      {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
      <button type="submit">{mode === 'add' ? 'Add Food' : 'Update Entry'}</button>
    </form>
  );
};

export default FoodEntryForm;
