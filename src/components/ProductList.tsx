import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddCart } from '../Redux/Slices/cartSystem'
import { toast } from 'react-hot-toast'
import { RootState } from '../Redux/store';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { RiShoppingCart2Fill } from 'react-icons/ri'


// interface Product {
//   id: number;
//   name: string;
//   category: string;
// }

interface ProductListProps {
  // products: Product[];
  products: any[];

}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const product = useSelector((state: RootState) => state.products.products) as any;
  const selectedCategory = useSelector((state: RootState) => state.products.selectedCategory) as any;
  const searchQuery = useSelector((state: RootState) => state.products.searchQuery) as any;
  const cart = useSelector((state: RootState) => state.cartData.cart) as any;
  const cookies = new Cookies();


  const token = cookies.get('token')


  const dispatch = useDispatch()
  const navigate = useNavigate();

  const filteredProducts = product.filter(
    (product: any) =>
      (!selectedCategory || product.category === selectedCategory) &&
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );




  function addIntoCart(data: any) {
    const { id } = data;
    const isAlreadyInCart = cart.some((item: any) => item.id === id);
    if (!token) {
      return navigate('/login');
    }
    if (isAlreadyInCart) {
      toast.error('Already Added to Cart');
    } else {
      try {
        dispatch(AddCart(data));
        toast.success('Item Added To Cart');
      } catch (error) {
        console.log(error);
      }
    }
    // try {
    //   dispatch(AddCart(data));
    //   toast.success('Item Added To Cart')

    // } catch (error) {
    //   console.log(error)

    // }
  }

  const [isHover, setIsHover] = useState<number | undefined>(undefined)

  return (
    <div className='flex justify-center flex-wrap gap-3 mb-10 mt-5'>
      {filteredProducts.map((product: any, index: any) => (
        <div key={index} onClick={() => addIntoCart(product)} className="w-60 bg-green-200 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl cursor-pointer" onMouseOver={() => setIsHover(index)} onMouseOut={() => setIsHover(undefined)}>
          <div className='relative bg-white'>
            {
              isHover === index ?
                <>
                  <div className='absolute flex left-0 right-0 top-0 bottom-0 bg-black bg-opacity-[80%] rounded-t-xl'>
                    <div className='m-auto text-white text-[14px] font-semibold'>Add To Cart</div>
                  </div>
                </>
                :
                null
            }
            <img src={product.image} alt="Product" className="h-60 w-60 object-contain rounded-t-xl" />
          </div>
          <div className="px-4 py-3 w-60">
            <span className="text-gray-400 mr-3 uppercase text-xs">{product.category}</span>
            <p className="text-lg font-bold text-black truncate block capitalize">{product.title}</p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">${product.price}</p>


              <div className="ml-auto">
                <RiShoppingCart2Fill className='h-[25px] w-[25px]' />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
