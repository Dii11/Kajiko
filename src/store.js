import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import categoryReducer from './features/categorySlice';
import budgetReducer from './features/budgetSlice';
import transactionReducer from './features/transactionSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoryReducer,
        budgets: budgetReducer,
            transactions: transactionReducer,


  },
});