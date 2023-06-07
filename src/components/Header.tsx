// Header.tsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../Redux/Slices/productSlice';

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(setSearchQuery(searchValue));
  };

  return (
    <div>
      <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Header;
