import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Redux/store';
import { setFilters, setSearchQuery } from '../Redux/Slices/productSlice';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const HomePage: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const filters = useSelector((state: RootState) => state.products.filters);
  const searchQuery = useSelector((state: RootState) => state.products.searchQuery);
  const dispatch = useDispatch();

  // Get the state values
  console.log(products); // Access the products state
  console.log(filters); // Access the filters state
  console.log(searchQuery); // Access the searchQuery state

  // Dispatch actions to update the state
  const updateFilters = (newFilters: string[]) => {
    dispatch(setFilters(newFilters));
  };

  const updateSearchQuery = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  // Use the state values and dispatch functions in your component

  return (
    <div>
      <Header/>
      <Sidebar/>
    </div>
  );
};

export default HomePage;
