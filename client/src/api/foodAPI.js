const API_URL = 'https://zen-nutrition-backend.vercel.app/api';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { 'Authorization': `Bearer ${token}` };
};

// Fetch all food items
export const fetchFoods = async () => {
  const response = await fetch(`${API_URL}/food`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });
  if (!response.ok) throw new Error('Could not fetch foods');
  return await response.json();
};

// Add a new food item
export const addFood = async (foodData) => {
  const response = await fetch(`${API_URL}/food`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(foodData),
  });
  if (!response.ok) throw new Error('Could not add food');
  return await response.json();
};

// Update a food item
export const updateFood = async (id, foodData) => {
  const response = await fetch(`${API_URL}/food/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(foodData),
  });
  if (!response.ok) throw new Error('Could not update food');
  return await response.json();
};

// Delete a food item
export const deleteFood = async (id) => {
  const response = await fetch(`${API_URL}/food/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });
  if (!response.ok) throw new Error('Could not delete food');
  return await response.json();
};
