import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const addBudget = createAsyncThunk(
  'budgets/addBudget',
  async ({ categorie, montant, periode }) => {
    const response = await axios.post(`${API_URL}/api/budgets`, { categorie, montant, periode });
    return response.data;
  }
);

export const fetchBudgets = createAsyncThunk(
  'budgets/fetchBudgets',
  async () => {
    const response = await axios.get(`${API_URL}/api/budgets`);
    return response.data;
  }
);

const budgetSlice = createSlice({
  name: 'budgets',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBudgets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchBudgets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addBudget.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default budgetSlice.reducer;