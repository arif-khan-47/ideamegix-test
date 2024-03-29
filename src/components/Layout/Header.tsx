// Header.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../../Redux/Slices/productSlice';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import { RootState } from '../../Redux/store';
import { CgMenuRightAlt } from 'react-icons/cg';
import { IoClose } from 'react-icons/io5'

const Header: React.FC = () => {
  // const {cart} = useSelector((item)=>item.cartData)
  const cart = useSelector((state: RootState) => state.cartData.cart) as any;
  const [open, setOpen] = useState<boolean>(false)
  console.log(open)

  const cookies = new Cookies();
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();


  const token = cookies.get('token')

  const handleSearch = (e: any) => {
    setSearchValue(e.target.value)
    dispatch(setSearchQuery(searchValue));
  };

  return (

    <div className=''>
      <header className="border-b md:flex md:items-center md:justify-between p-4 pb-0 shadow-lg md:pb-4">

        <div className="flex items-center justify-between mb-4 md:mb-0">
          <h1 className="leading-none text-2xl text-grey-darkest">
            <Link className="no-underline text-grey-darkest hover:text-black" to="/">
              Logo
            </Link>
          </h1>

          <div onClick={() => setOpen(!open)} className="text-black cursor-pointer hover:text-orange md:hidden relative">
            {
              open ?
              <IoClose className='h-8 w-8' />
              :
              <>
              {
                cart.length>0&&
              <div className='absolute right-0 top-0 bg-red-600 rounded-full px-1 text-[10px]'>{cart.length}</div>
              }
                <CgMenuRightAlt className='h-8 w-8' />
              </>
            }
          </div>
        </div>

        <div className={`mb-4 w-full md:mb-0 md:w-1/4 md:block ${open ? 'block' : 'hidden'} `}>
          <input className="bg-grey-lightest border-2 focus:border-orange p-2 rounded-lg shadow-inner w-full" placeholder="Search Product Name" type="text" value={searchValue} onChange={handleSearch} />
        </div>

        <nav className={`md:block ${open ? 'block' : 'hidden'}`}>
          <ul className="list-reset md:flex md:items-center">
            {
              token ?
                <>
                  <li className="md:ml-4">
                    <Link className="block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0" to="/cart">
                      Cart ({cart.length})
                    </Link>
                  </li>
                  <li onClick={() => { cookies.remove('token'); window.location.reload() }} className="md:ml-4 cursor-pointer block no-underline hover:underline py-2 text-red-500 hover:text-red-700 md:border-none md:p-0" >
                    Logout
                  </li>
                </>
                :
                
                  <li className="md:ml-4">
                    <Link className="block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0" to="/login">
                      Login
                    </Link>
                  </li>
                
            }

          </ul>
        </nav>

      </header>
    </div>
  );
};

export default Header;
