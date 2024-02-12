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
  const data = await response.json();
  if (!response.ok) throw new Error('Could not fetch daily log');
  return data;
};
  
// Add a food item to the daily log
export const addFoodToDailyLog = async (date, foodEntries) => {
  // Ensure foodEntries is an array, in the case that you want to add more than 1 foodEntry in a single request, which the backend allows
  const entries = Array.isArray(foodEntries) ? foodEntries : [foodEntries];
  const response = await fetch(`${API_URL}/dailyLog`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify({ date, foodEntries: entries }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error('Could not add food to daily log');
  return data;
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
  const data = await response.json();
  if (!response.ok) throw new Error('Could not update food entry in daily log');
  return data;
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
  const data = await response.json();
  if (!response.ok) throw new Error('Could not delete food entry from daily log');
  return data;
};
