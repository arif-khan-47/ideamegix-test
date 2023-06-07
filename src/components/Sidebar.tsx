// Sidebar.tsx

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedCategory } from '../Redux/Slices/productSlice';
import { getAllCategories } from '../https';

const Sidebar = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<any>([])
  const [isLoadingCategory, setIsLoadingCategory] = useState(true)
  const [tab, setTab] = useState('')

  const handleCategoryClick = (category: string) => {
    setTab(category);
    dispatch(setSelectedCategory(category));
  };

  async function fetchData() {
    try {
      const res = await getAllCategories()
      setCategories(res?.data)
      setIsLoadingCategory(false)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <ul className=''>
        {isLoadingCategory ?
          <div>Loading</div> :
          <>
            <div className='font-bold text-2xl mb-2'>Filter</div>
            <li onClick={() => handleCategoryClick("")} className={`${tab == '' ? 'text-red-600 font-bold' : ''} cursor-pointer mb-2`}>All</li>
            {
              categories?.map((item: string, index: number) => (
                <li onClick={() => handleCategoryClick(item)} className={`${tab == item ? 'text-red-600 font-bold' : ''} capitalize cursor-pointer mb-2`}>{item}</li>
              ))
            }
          </>
        }

      </ul>
    </div>
  );
};

export default Sidebar;
