import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userAPI from '../api/userAPI';

// Async thunk actions
export const loginUserThunk = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await userAPI.loginUser(email, password);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUserThunk = createAsyncThunk(
  'user/register',
  async ({ username, email, password }, { rejectWithValue }) => {
    console.log("Thunk payload:", { username, email, password }); // This should log actual values, not elements
    try {
      console.log("Thunk payload:", { username, email, password });
      const data = await userAPI.registerUser({ username, email, password }); // changed from const data = await userAPI.registerUser(user);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  user: null,
  isLoggedIn: false,
  token: null,
  status: 'idle',
  error: null,
};

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(registerUserThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Actions
export const { logout } = userSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.user.user;
export const selectAuthStatus = (state) => state.user.status;
export const selectAuthError = (state) => state.user.error;

// Reducer
export default userSlice.reducer;
