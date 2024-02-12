const API_URL = 'https://zen-nutrition-backend.vercel.app/api';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { 'Authorization': `Bearer ${token}` };
};

// Fetch all food items which can also use name search
export const fetchFoods = async (searchQuery = "") => {
  const url = `${API_URL}/food${searchQuery ? `?searchQuery=${searchQuery}` : ""}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });
  const data = await response.json();
  if (!response.ok) throw new Error('Could not fetch foods');
  return data;
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
  const data = await response.json();
  if (!response.ok) throw new Error('Could not add food');
  return data;
};

// Update a food item
export const updateFood = async (foodData) => {
  const response = await fetch(`${API_URL}/food`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(foodData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error('Could not update food');
  return data;
};

// Delete a food item
export const deleteFood = async (_id) => {
  const response = await fetch(`${API_URL}/food`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify({ _id }), // Sending _id in the body
  });
  const data = await response.json();
  if (!response.ok) throw new Error('Could not delete food');
  return data;
};
