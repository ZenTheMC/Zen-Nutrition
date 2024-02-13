import React from 'react';
import FoodItem from './FoodItem';

const FoodList = ({ foodItems, onDelete, date }) => {
  return (
    <div className="mt-4">
      {foodItems.map((item) => (
        <FoodItem key={item._id} {...item} date={date} onDelete={() => onDelete(item._id)} />
      ))}
    </div>
  );
};

export default FoodList;
