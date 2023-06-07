// Header.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../Redux/Slices/productSlice';

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (e:any) => {
    setSearchValue(e.target.value)
    dispatch(setSearchQuery(searchValue));
  };

  return (
    <div>
      <input type="text" value={searchValue} onChange={handleSearch} />
    </div>
  );
};

export default Header;
