import React, { useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { DeleteAllFromCart } from '../Redux/Slices/cartSystem'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

function OrderPlaced() {

    const cart = useSelector((state: RootState) => state.cartData.cart) as any;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cookies = new Cookies();
    const token = cookies.get('token')
    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
        if (cart.length !== 0) {
            setTimeout(() => {
                dispatch(DeleteAllFromCart());
                navigate('/')
            }, 3000);
        }

    }, [dispatch]);


    return (
        <Layout>
            <div className='container m-auto '>
                <div className='flex h-screen -mt-40 lg:-mt-20'>
                    {
                        cart.length === 0 ?
                            <div className='m-auto text-2xl font-bold'>Sorry! You Don't have anything to place...</div>
                            :
                            <div className='m-auto text-2xl font-bold'>Congractulations! Your Order Has Been Placed...</div>
                    }

                </div>
            </div>

        </Layout>
    )
}

export default OrderPlaced
