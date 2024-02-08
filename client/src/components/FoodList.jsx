import React from 'react';
import FoodItem from './FoodItem';

const FoodList = ({ foodItems }) => {
  return (
    <div>
      {foodItems.map((item) => (
        <FoodItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default FoodList;
