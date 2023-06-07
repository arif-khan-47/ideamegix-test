import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Redux/store';
import { setSearchQuery, setProducts, setIsLoading } from '../Redux/Slices/productSlice';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Sidebar';
import { getAllProducts } from '../https';
import ProductList from '../components/ProductList';
import Layout from '../components/Layout/Layout';

const HomePage: React.FC = () => {
  // const [isLoading, setisLoading] = useState<boolean>(true)
  const products = useSelector((state: RootState) => state.products.products) as any;
  const isLoading = useSelector((state: RootState) => state.products.isLoading);



  // Filter products based on the search query

  // const filters = useSelector((state: RootState) => state.products.filters);
  const dispatch = useDispatch();

  // Get the state values
  // console.log(filters); // Access the filters state
  // console.log(searchQuery); // Access the searchQuery state

  async function fetchData() {
    try {
      const res = await getAllProducts()
      // console.log(res.data);
      dispatch(setProducts(res?.data))
      dispatch(setIsLoading(false))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  // Use the state values and dispatch functions in your component

  return (
    <>
      <Layout>
        <div className='container m-auto'>
          <div className='grid sm:grid-cols-6 mt-5'>
            <div className='col-span-1'>
              <Sidebar />
            </div>
            <div className='col-span-5'>
              {
                isLoading ?
                  <div>Loading</div> :
                  <ProductList products={products} />
              }

            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
