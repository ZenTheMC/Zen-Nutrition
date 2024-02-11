const API_URL = 'https://zen-nutrition-backend.vercel.app/api';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { 'Authorization': `Bearer ${token}` };
};

// Fetch all food items which can also use name search
export const fetchFoods = async (searchQuery = "") => {
  const url = `${API_URL}/food${searchQuery ? `?searchQuery=${searchQuery}` : ""}`;
  console.log(`Fetching foods from ${url}`, { method: 'GET', headers: { ...getAuthHeader() } });

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });

  console.log(`Response status for fetchFoods: ${response.status}`);
  const data = await response.json();
  console.log(`Data received for fetchFoods: `, data);

  if (!response.ok) throw new Error('Could not fetch foods');
  return data;
};

// Add a new food item
export const addFood = async (foodData) => {
  console.log(`Adding food to ${API_URL}/food`, { method: 'POST', headers: { ...getAuthHeader() }, body: foodData });

  const response = await fetch(`${API_URL}/food`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(foodData),
  });
  
  console.log(`Response status for addFood: ${response.status}`);
  const data = await response.json();
  console.log(`Data received for addFood: `, data);

  if (!response.ok) throw new Error('Could not add food');
  return data;
};

// Update a food item
export const updateFood = async (foodData) => {
  console.log(`Updating food with data`, { method: 'PUT', headers: { ...getAuthHeader() }, body: foodData });

  const response = await fetch(`${API_URL}/food`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(foodData), // Ensure _id is part of foodData
  });

  console.log(`Response status for updateFood: ${response.status}`);
  const data = await response.json();
  console.log(`Data received for updateFood: `, data);

  if (!response.ok) throw new Error('Could not update food');
  return data;
};

// Delete a food item
export const deleteFood = async (_id) => {
  console.log(`Deleting food with ID ${_id}`, { method: 'DELETE', headers: { ...getAuthHeader() }, body: { _id } });
  
  const response = await fetch(`${API_URL}/food`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify({ _id }), // Sending _id in the body
  });

  console.log(`Response status for deleteFood: ${response.status}`);
  const data = await response.json();
  console.log(`Data received for deleteFood: `, data);

  if (!response.ok) throw new Error('Could not delete food');
  return data;
};
