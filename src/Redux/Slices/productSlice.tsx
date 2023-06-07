import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  selectedCategory: null,
  searchQuery: '',
  isLoading: true
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  }
});

export const { setProducts, setSelectedCategory, setSearchQuery, setIsLoading } = productsSlice.actions;

export default productsSlice.reducer;
