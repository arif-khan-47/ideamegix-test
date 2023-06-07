// Sidebar.tsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters } from '../Redux/Slices/productSlice';

const Sidebar: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const dispatch = useDispatch();

  const handleFilterSelection = (filter: string) => {
    // Toggle the filter selection
    const updatedFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter((item) => item !== filter)
      : [...selectedFilters, filter];

    setSelectedFilters(updatedFilters);
  };

  const handleApplyFilters = () => {
    dispatch(setFilters(selectedFilters));
  };

  return (
    <div>
      <h2>Filters</h2>
      <ul>
        <li>
          <label>
            <input
              type="checkbox"
              checked={selectedFilters.includes('filter1')}
              onChange={() => handleFilterSelection('filter1')}
            />
            Filter 1
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={selectedFilters.includes('filter2')}
              onChange={() => handleFilterSelection('filter2')}
            />
            Filter 2
          </label>
        </li>
        {/* Add more filter options... */}
      </ul>
      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
};

export default Sidebar;
