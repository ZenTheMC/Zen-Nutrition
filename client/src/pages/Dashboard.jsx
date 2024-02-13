import React, { useEffect, useState } from 'react';
import { fetchDailyLog, deleteFoodEntryFromDailyLog } from '../api/logAPI';
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
  const [foodsMessage, setFoodsMessage] = useState('');
  const [dailyLogMessage, setDailyLogMessage] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');
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
    try {
      const fetchedFoods = await fetchFoods(searchQuery);
      setFoods(fetchedFoods);
      setFoodsMessage(fetchedFoods.length === 0 ? 'No foods found. Add a new food to get started!' : '');
    } catch (error) {
      console.error("Error fetching foods", error);
      setFoodsMessage('An error occurred while fetching your foods.');
    }
  };
  
  const handleSearchFoods = async (searchQuery) => {
    await loadFoods(searchQuery);
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
      console.error('No daily log present for date', error);
      setDailyLogMessage('Log your foods!');
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

  const handleDeleteAllFoodsForToday = async () => {
    try {
      await deleteFoodEntryFromDailyLog(currentDate);
      setDeleteMessage("All food entries for this date have been deleted.");
      setTimeout(() => setDeleteMessage(''), 5000);
      setDailyLog([]);
      setNutritionalSummary({
      totalProtein: 0,
      totalCarbs: 0,
      totalFats: 0,
      totalCalories: 0,
    });
    loadDailyLog();
    } catch (error) {
      console.error("Error deleting all food entries for today", error);
      setDeleteMessage("Failed to delete all food entries for date.");
    }
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
      {foodsMessage && <p className="font-semibold">{foodsMessage}</p>}
      {dailyLogMessage && <p className="font-bold">{dailyLogMessage}</p>}
      {deleteMessage && (
        <div className="flex justify-between items-center bg-red-100 text-red-700 p-4 rounded">
          <p>{deleteMessage}</p>
          <button onClick={() => setDeleteMessage('')} className="bg-red-500 text-white rounded px-4 py-2">
            Close
          </button>
        </div>
      )}
      <button onClick={handleAddFoodClick} className="m-4 p-2 bg-blue-500 text-white rounded">Add New Food to Database</button>
      <button onClick={handleAddEntryClick} className="m-4 p-2 bg-green-500 text-white rounded">Add Entry to Log</button>
      <button onClick={handleDeleteAllFoodsForToday} className="m-4 p-2 bg-red-500 text-white rounded">Delete All Foods for Today</button>
      <FoodList foodItems={dailyLog} date={currentDate} onDelete={loadDailyLog} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {formMode === 'addEntry' && (
          <FoodSelector
            foods={foods}
            onSelect={setSelectedFoodId}
            onSearch={handleSearchFoods}
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
