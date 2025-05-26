import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL ;
export const fetchUserByEmail = createAsyncThunk(
  'user/fetchByEmail',
  async (email) => {
    const response = await axios.get(`${API_URL}/api/users/email/${email}`);
    return response.data;
  }
);
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ id, nom, prenom, email, telephone }) => {
    const response = await axios.put(`${API_URL}/api/users/${id}`, {
      nom, prenom, email, telephone
    });
    return response.data;
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserByEmail.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    });
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;