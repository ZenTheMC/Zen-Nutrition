const API_URL = 'https://zen-nutrition-backend.vercel.app/api';

export const loginUser = async ({ email, password }) => { // changed params to be destructured to match register which works
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorResponse = await response.json(); // changed error handling to match register
      throw new Error(errorResponse.error || 'Failed to log in'); // changed error handling to match register
    }
    return await response.json(); // returned directly instead of having two lines with variable that stores response + return variable, to match register
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async ({ username, email, password }) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.error || 'Failed to register');
    }
    return await response.json();
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};
