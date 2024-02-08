import React, { useState, useEffect } from 'react';

const FoodSelector = ({ onSelect, searchFoods }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFoods, setFilteredFoods] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchTerm.trim()) {
        const searchedFoods = await searchFoods(searchTerm);
        setFilteredFoods(searchedFoods);
      } else {
        setFilteredFoods([]);
      }
    };

    const delayDebounce = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, searchFoods]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search Food"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select a Food</option>
        {filteredFoods.map((food) => (
          <option key={food._id} value={food._id}>
            {food.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FoodSelector;
