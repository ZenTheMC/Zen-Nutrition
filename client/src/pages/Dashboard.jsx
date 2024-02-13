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
    <div className="min-h-screen bg-gray-200 dark:bg-gray-700 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">Nutritional Summary for {currentDate}</h1>
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-4">
          <p className="text-gray-800 dark:text-gray-200">Protein: {nutritionalSummary.totalProtein}g</p>
          <p className="text-gray-800 dark:text-gray-200">Carbs: {nutritionalSummary.totalCarbs}g</p>
          <p className="text-gray-800 dark:text-gray-200">Fats: {nutritionalSummary.totalFats}g</p>
          <p className="text-gray-800 dark:text-gray-200">Calories: {nutritionalSummary.totalCalories}</p>
        </div>
        {foodsMessage && <p className="font-semibold text-center text-gray-800 dark:text-white mb-4">{foodsMessage}</p>}
        {dailyLogMessage && <p className="font-bold text-center text-gray-800 dark:text-white mb-4">{dailyLogMessage}</p>}
        {deleteMessage && (
          <div className="flex justify-between items-center bg-red-100 dark:bg-red-700 text-red-700 dark:text-white p-4 rounded mb-4">
            <p>{deleteMessage}</p>
            <button onClick={() => setDeleteMessage('')} className="bg-red-500 dark:bg-red-600 text-white rounded px-4 py-2">
              Close
            </button>
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={handleAddFoodClick} className="px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-800 transition">
            Add New Food to Database
          </button>
          <button onClick={handleAddEntryClick} className="px-4 py-2 bg-green-500 dark:bg-green-700 text-white rounded hover:bg-green-600 dark:hover:bg-green-800 transition">
            Add Entry to Log
          </button>
          <button onClick={handleDeleteAllFoodsForToday} className="px-4 py-2 bg-red-500 dark:bg-red-700 text-white rounded hover:bg-red-600 dark:hover:bg-red-800 transition">
            Delete All Foods for Today
          </button>
        </div>
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
    </div>
  );
};

export default Dashboard;
