import React, { useEffect, useState } from 'react';
import { getDailyLog } from '../api/logAPI';
import FoodList from '../components/FoodList';

const Dashboard = () => {
  const [dailyLog, setDailyLog] = useState([]);

  useEffect(() => {
    const fetchDailyLog = async () => {
      const data = await getDailyLog();
      setDailyLog(data.foodEntries);
    };
    fetchDailyLog();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <FoodList foodItems={dailyLog} />
      {/* Add form or button to add new food item */}
    </div>
  );
};

export default Dashboard;
