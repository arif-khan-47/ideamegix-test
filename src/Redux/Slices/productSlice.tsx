import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  filters: '',
  searchQuery: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setProducts, setFilters, setSearchQuery } = productsSlice.actions;

export default productsSlice.reducer;
