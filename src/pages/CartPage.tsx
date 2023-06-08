import React, {useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Redux/store';
import { DeleteFromCart } from '../Redux/Slices/cartSystem'
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

function CartPage() {
    const cart = useSelector((state: RootState) => state.cartData.cart) as any;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('token')


    function removeFromCart(product:any) {
        console.log(product)
        try {
            dispatch(DeleteFromCart(product));
            toast.success('Item Removed');
          } catch (error) {
            console.log(error);
          }
    }

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }

    }, []);

    return (
        <Layout>
            <div className='m-auto container pb-10'>
                {
                    cart.length > 0 ?
                        <div className='flex justify-end mt-5 mb-10 mx-5 md:mx-0'>
                            <Link to={'/order-placed'}>
                            <div className='bg-green-300 px-3 py-2 text-xl font-semibold cursor-pointer rounded-md'>Place All Order</div>
                            </Link>
                        </div>
                        :
                        <div className='text-center mt-10 text-2xl font-bold'>Your Cart is Empty!</div>

                }
                {
                    cart.length > 0 && (
                        cart.map((item: any, index: number) => (
                            <div key={index} className="flex items-center w-[100%] bg-gray-300 mt-5 rounded-md">
                                <span className="text-center w-1/12 font-semibold text-sm">{index + 1}</span>

                                <div className="flex w-2/5">
                                    <div className="w-20 p-1">
                                        <img className="h-24 rounded-md" src={item.image} alt="" />
                                    </div>
                                    <div className="flex flex-col justify-between ml-4 flex-grow">
                                        <span className="font-bold md:text-xl my-auto">{item.title}</span>
                                    </div>
                                </div>
                                <span className="text-center w-1/5 font-semibold text-sm">{item.category}</span>
                                <span className="text-center w-1/5 font-semibold md:text-xl">${item.price}</span>
                                <div className="flex justify-center w-1/5">
                                    <div onClick={() => removeFromCart(item.id)} className="font-semibold hover:text-red-500 text-gray-500 md:text-xl cursor-pointer">Remove</div>
                                </div>
                            </div>
                        ))
                    )


                }


            </div>
        </Layout>
    )
}

export default CartPage
