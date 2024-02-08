import React from 'react';
import FoodItem from './FoodItem';

// Added onDelete prop
const FoodList = ({ foodItems, onDelete }) => {
  return (
    <div>
      {foodItems.map((item) => (
        // Pass onDelete to each FoodItem correctly
        <FoodItem key={item.id} {...item} onDelete={() => onDelete(item.id)} />
      ))}
    </div>
  );
};

export default FoodList;
