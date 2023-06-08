// Sidebar.tsx

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedCategory } from '../Redux/Slices/productSlice';
import { getAllCategories } from '../https';
import { IoFilter } from 'react-icons/io5';

const Sidebar = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<any>([])
  const [isLoadingCategory, setIsLoadingCategory] = useState(true)
  const [tab, setTab] = useState('')
  const [open, setOpen] = useState<boolean>(false)

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
    <div className=''>
      <ul className='mx-5 md:mx-0'>
        {isLoadingCategory ?
          <div className='text-center text-xl font-semibold md:text-left'>Loading...</div> :
          <>
            <div onClick={()=>setOpen(!open)} className='font-bold text-2xl mb-2 flex gap-2 w-fit cursor-pointer md:cursor-default'>Filter <IoFilter className='my-auto text-lg'/></div>
            <li onClick={() => handleCategoryClick("")} className={`${tab == '' ? 'text-red-600 font-bold' : ''} ${open?'block':'hidden'} md:block cursor-pointer mb-2`}>All</li>
            {
              categories?.map((item: string, index: number) => (
                <li key={index} onClick={() => handleCategoryClick(item)} className={`${tab == item ? 'text-red-600 font-bold' : ''} ${open?'block':'hidden'} md:block capitalize cursor-pointer mb-2`}>{item}</li>
              ))
            }
          </>
        }

      </ul>
    </div>
  );
};

export default Sidebar;
