import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Thunk pour ajouter une catégorie
export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async ({ nom, type }) => {
    const response = await axios.post(`${API_URL}/api/categories`, { nom, type });
    return response.data;
  }
);

// Thunk pour récupérer toutes les catégories
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await axios.get(`${API_URL}/api/categories`);
    return response.data;
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default categorySlice.reducer;