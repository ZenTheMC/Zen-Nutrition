import React, { useEffect, useState } from 'react';
import { fetchDailyLog } from '../api/logAPI';
import FoodList from '../components/FoodList';
import FoodEntryForm from '../components/FoodEntryForm';

const Dashboard = () => {
  const [dailyLog, setDailyLog] = useState([]);
  const [formMode, setFormMode] = useState('add');
  const [selectedFoodEntryId, setSelectedFoodEntryId] = useState(null);
  const currentDate = new Date().toISOString().split('T')[0];

  const loadDailyLog = async () => {
    try {
      const data = await fetchDailyLog(currentDate);
      setDailyLog(data.foodEntries || []);
    } catch (error) {
      console.error('Error fetching daily log', error);
    }
  };

  useEffect(() => {
    loadDailyLog();
  }, []);

  const handleFormSubmitSuccess = () => {
    setFormMode('add');
    setSelectedFoodEntryId(null);
    loadDailyLog();
  };

  const handleEditFoodEntry = (foodEntryId) => {
    setFormMode('update');
    setSelectedFoodEntryId(foodEntryId);
  };

  const handleDeleteFoodEntrySuccess = () => {
    loadDailyLog();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <FoodEntryForm
        date={currentDate}
        foodEntryId={selectedFoodEntryId}
        mode={formMode}
        onSubmitSuccess={handleFormSubmitSuccess}
      />
      <FoodList
        foodItems={dailyLog}
        onDelete={handleDeleteFoodEntrySuccess}
        onEditFoodEntry={handleEditFoodEntry}
        onDeleteFoodEntrySuccess={handleDeleteFoodEntrySuccess}
      />
    </div>
  );
};

export default Dashboard;
