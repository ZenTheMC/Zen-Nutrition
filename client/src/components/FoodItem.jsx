import React from 'react';

const FoodItem = ({ name, protein, carbs, fats, quantity }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>Protein: {protein}g</p>
      <p>Carbs: {carbs}g</p>
      <p>Fats: {fats}g</p>
      <p>Quantity: {quantity}g</p>
    </div>
  );
};

export default FoodItem;
