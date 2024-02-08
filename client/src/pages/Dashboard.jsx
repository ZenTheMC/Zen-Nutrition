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
  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const loadData = async () => {
      await loadFoods();
      await loadDailyLog();
    };

    loadData();
  }, []);

  const loadFoods = async () => {
    const fetchedFoods = await fetchFoods();
    setFoods(fetchedFoods);
  };

  const loadDailyLog = async () => {
    const data = await fetchDailyLog(currentDate);
    setDailyLog(data.foodEntries || []);
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
      <h1>Dashboard</h1>
      <button onClick={handleAddFoodClick} className="m-4 p-2 bg-blue-500 text-white rounded">Add New Food to Database</button>
      <button onClick={handleAddEntryClick} className="m-4 p-2 bg-green-500 text-white rounded">Add Entry to Log</button>
      <FoodList foodItems={dailyLog} onDelete={loadDailyLog} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {formMode === 'addEntry' && <FoodSelector foods={foods} onSelect={setSelectedFoodId} />}
        <FoodEntryForm
          mode={formMode}
          onSubmitSuccess={handleFormSubmitSuccess}
          date={currentDate}
          foodEntryId={selectedFoodId}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
