
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './Slices/productSlice';

// Define the root state type
export type RootState = ReturnType<typeof store.getState>;

// Create the Redux store
const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export default store;