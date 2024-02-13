import React from 'react';
import FoodItem from './FoodItem';

const FoodList = ({ foodItems, onDelete }) => {
  return (
    <div>
      {foodItems.map((item) => (
        <FoodItem key={item._id} {...item} onDelete={() => onDelete(item._id)} />
      ))}
    </div>
  );
};

export default FoodList;
