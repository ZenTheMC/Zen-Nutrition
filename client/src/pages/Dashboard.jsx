import React, { useEffect, useState } from 'react';
import { fetchDailyLog } from '../api/logAPI';
import { fetchFoods } from '../api/foodAPI';
import FoodList from '../components/FoodList';
import FoodEntryForm from '../components/FoodEntryForm';
import Modal from '../components/Modal';
import FoodSelector from '../components/FoodSelector';

const Dashboard = () => {
  const [dailyLog, setDailyLog] = useState([]);
  const [foods, setFoods] = useState([]);
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const [formMode, setFormMode] = useState('addEntry');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nutritionalSummary, setNutritionalSummary] = useState({
    totalProtein: 0,
    totalCarbs: 0,
    totalFats: 0,
    totalCalories: 0,
  });
  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    loadFoods();
    loadDailyLog();
  }, []);

  const loadFoods = async (searchQuery = '') => {
    const fetchedFoods = await fetchFoods(searchQuery);
    setFoods(fetchedFoods);
  };

  const loadDailyLog = async () => {
    try {
      const data = await fetchDailyLog(currentDate);
      setDailyLog(data.foodEntries || []);
      setNutritionalSummary({
        totalProtein: data.totalMacros.protein,
        totalCarbs: data.totalMacros.carbs,
        totalFats: data.totalMacros.fats,
        totalCalories: data.totalCalories,
      });
    } catch (error) {
      console.error('Error fetching daily log', error);
    }
  };

  const handleFormSubmitSuccess = () => {
    setIsModalOpen(false);
    loadDailyLog();
    if (formMode === 'addFood') {
      loadFoods();
    }
  };

  const handleAddFoodClick = () => {
    setFormMode('addFood');
    setIsModalOpen(true);
  };

  const handleAddEntryClick = () => {
    setFormMode('addEntry');
    setIsModalOpen(true);
  };

  return (
    <div>
      <div>
        <h1>Nutritional Summary for {currentDate}</h1>
        <p>Protein: {nutritionalSummary.totalProtein}g</p>
        <p>Carbs: {nutritionalSummary.totalCarbs}g</p>
        <p>Fats: {nutritionalSummary.totalFats}g</p>
        <p>Calories: {nutritionalSummary.totalCalories}</p>
      </div>
      <button onClick={handleAddFoodClick} className="m-4 p-2 bg-blue-500 text-white rounded">Add New Food to Database</button>
      <button onClick={handleAddEntryClick} className="m-4 p-2 bg-green-500 text-white rounded">Add Entry to Log</button>
      <FoodList foodItems={dailyLog} onDelete={loadDailyLog} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {formMode === 'addEntry' && (
          <FoodSelector
            foods={foods}
            onSelect={setSelectedFoodId}
            searchFoods={(query) => loadFoods(query)}
          />
        )}
        <FoodEntryForm
          mode={formMode}
          onSubmitSuccess={handleFormSubmitSuccess}
          date={currentDate}
          selectedFoodId={selectedFoodId}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
