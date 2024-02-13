import React, { useState, useEffect } from 'react';

const FoodSelector = ({ foods, onSelect, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debounceValue, setDebounceValue] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    onSearch(debounceValue);
  }, [debounceValue, onSearch]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search Food by Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select a Food</option>
        {foods.length > 0 ? (
          foods.map((food) => (
            <option key={food._id} value={food._id}>{food.name}</option>
          ))
        ) : (
          <option value="" disabled>No foods available</option>
        )}
      </select>
    </div>
  );
};

export default FoodSelector;
