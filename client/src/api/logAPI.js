const API_URL = 'https://zen-nutrition-backend.vercel.app/api';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { 'Authorization': `Bearer ${token}` };
};

// Fetch the daily log for a specific date
export const fetchDailyLog = async (date) => {
  console.log(`Fetching daily log for ${date} from ${API_URL}/dailyLog`, { method: 'GET', headers: { ...getAuthHeader() } });

  const response = await fetch(`${API_URL}/dailyLog?date=${date}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });

  console.log(`Response status for fetchDailyLog: ${response.status}`);
  const data = await response.json();
  console.log(`Data received for fetchDailyLog: `, data);

  if (!response.ok) throw new Error('Could not fetch daily log');
  return data;
};
  
// Add a food item to the daily log
export const addFoodToDailyLog = async (date, foodEntries) => {
  // Ensure foodEntries is an array, in the case that you want to add more than 1 foodEntry in a single request, which the backend allows
  const entries = Array.isArray(foodEntries) ? foodEntries : [foodEntries];

  console.log(`Adding food to daily log for ${date} from ${API_URL}/dailyLog`, {
    method: 'POST',
    headers: { ...getAuthHeader() },
    body: { date, foodEntries: entries }
  });

  const response = await fetch(`${API_URL}/dailyLog`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify({ date, foodEntries: entries }),
  });

  console.log(`Response status for addFoodToDailyLog: ${response.status}`);
  const data = await response.json();
  console.log(`Data received for addFoodToDailyLog: `, data);

  if (!response.ok) throw new Error('Could not add food to daily log');
  return data;
};

// Updating a food entry's quantity in a daily log
export const updateFoodEntryInDailyLog = async (date, foodEntryId, newQuantity) => {
  console.log(`Updating food entry in daily log for ${date} with foodEntryId ${foodEntryId} to newQuantity ${newQuantity}`, { method: 'PUT', headers: { ...getAuthHeader() } });

  const response = await fetch(`${API_URL}/dailyLog`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
      },
      body: JSON.stringify({ date, foodEntryId, newQuantity }),
  });

  console.log(`Response status for updateFoodEntryInDailyLog: ${response.status}`);
  const data = await response.json();
  console.log(`Data received for updateFoodEntryInDailyLog: `, data);

  if (!response.ok) throw new Error('Could not update food entry in daily log');
  return data;
};

// Deleting a food entry from a daily log
export const deleteFoodEntryFromDailyLog = async (date, foodEntryId) => {
  console.log(`Deleting food entry from daily log for ${date} with foodEntryId ${foodEntryId}`, { method: 'DELETE', headers: { ...getAuthHeader() } });

  const response = await fetch(`${API_URL}/dailyLog`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
      },
      body: JSON.stringify({ date, foodEntryId }),
  });

  console.log(`Response status for deleteFoodEntryFromDailyLog: ${response.status}`);
  const data = await response.json();
  console.log(`Data received for deleteFoodEntryFromDailyLog: `, data);

  if (!response.ok) throw new Error('Could not delete food entry from daily log');
  return data;
};
