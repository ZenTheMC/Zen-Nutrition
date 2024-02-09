const API_URL = 'https://zen-nutrition-backend.vercel.app/api';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { 'Authorization': `Bearer ${token}` };
};

// Fetch the daily log for a specific date
export const fetchDailyLog = async (date) => {
    const response = await fetch(`${API_URL}/dailyLog?date=${date}`, {
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
    const response = await fetch(`${API_URL}/dailyLog`, {
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

// Updating a food entry's quantity in a daily log
export const updateFoodEntryInDailyLog = async (date, foodEntryId, newQuantity) => {
  const response = await fetch(`${API_URL}/dailyLog`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
      },
      body: JSON.stringify({ date, foodEntryId, newQuantity }),
  });
  if (!response.ok) throw new Error('Could not update food entry in daily log');
  return await response.json();
};

// Deleting a food entry from a daily log
export const deleteFoodEntryFromDailyLog = async (date, foodEntryId) => {
  const response = await fetch(`${API_URL}/dailyLog`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
      },
      body: JSON.stringify({ date, foodEntryId }),
  });
  if (!response.ok) throw new Error('Could not delete food entry from daily log');
  return await response.json();
};
