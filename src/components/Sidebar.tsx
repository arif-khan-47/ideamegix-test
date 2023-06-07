// Sidebar.tsx

import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedCategory } from '../Redux/Slices/productSlice';

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleCategoryClick = (category: string) => {
    dispatch(setSelectedCategory(category));
  };

  return (
    <div>
      <ul>
        <li onClick={() => handleCategoryClick("men's clothing")}>Category 1</li>
        <li onClick={() => handleCategoryClick('category2')}>Category 2</li>
      </ul>
    </div>
  );
};

export default Sidebar;
