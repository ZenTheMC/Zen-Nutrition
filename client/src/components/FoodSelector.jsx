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
    <div className="p-4 m-4">
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-white dark:bg-gray-700 mb-4"
        type="text"
        placeholder="Filter by Name - Then Pick Below"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        className="shadow border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-white dark:bg-gray-700"
        onChange={(e) => onSelect(e.target.value)}
      >
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
