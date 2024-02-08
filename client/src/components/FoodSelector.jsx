import React from 'react';

const FoodSelector = ({ foods, onSelect }) => {
  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select a Food</option>
      {foods.map((food) => (
        <option key={food._id} value={food._id}>
          {food.name}
        </option>
      ))}
    </select>
  );
};

export default FoodSelector;
