import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Thunk pour récupérer toutes les transactions
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async () => {
    const response = await axios.get(`${API_URL}/api/transactions`);
    return response.data;
  }
);

// Thunk pour ajouter une transaction
export const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async (transactionData) => {
    const response = await axios.post(`${API_URL}/api/transactions`, transactionData);
    return response.data;
  }
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default transactionSlice.reducer;