import React, { useState, useEffect } from 'react';

const FoodSelector = ({ foods, onSelect, searchFoods }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFoods, setFilteredFoods] = useState(foods);

  useEffect(() => {
    setFilteredFoods(foods);
  }, [foods]);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchTerm.trim()) {
        const searchedFoods = await searchFoods(searchTerm);
        setFilteredFoods(searchedFoods);
      } else {
        setFilteredFoods(foods);
      }
    };

    const delayDebounce = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, foods, searchFoods]);

  // Debugging: Log the foods to see if they are being passed and updated correctly.
  useEffect(() => {
    console.log('Foods in FoodSelector:', filteredFoods);
  }, [filteredFoods]);

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
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
            <option key={food._id} value={food._id}>
              {food.name}
            </option>
          ))
        ) : (
          <option disabled>No foods available</option>
        )}
      </select>
    </div>
  );
};

export default FoodSelector;
