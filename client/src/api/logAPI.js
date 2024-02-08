const API_URL = 'https://zen-nutrition-backend.vercel.app/api';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { 'Authorization': `Bearer ${token}` };
};

// Fetch the daily log for a specific date
export const fetchDailyLog = async (date) => {
    const response = await fetch(`${API_URL}/daily-log?date=${date}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    if (!response.ok) throw new Error('Could not fetch daily log');
    return await response.json();
};
  
// Add a food item to the daily log
export const addFoodToDailyLog = async (date, foodEntry) => {
    const response = await fetch(`${API_URL}/daily-log`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ date, foodEntries: [foodEntry] }),
    });
    if (!response.ok) throw new Error('Could not add food to daily log');
    return await response.json();
};
