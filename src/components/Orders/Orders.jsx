import React from 'react';
import Cart from '../Cart/Cart';
import cartProductsLoader from '../../Loaders/CartProductLoaders';
import { useLoaderData } from 'react-router-dom';

const Orders = () => {
    const cart = useLoaderData();
    return (
        <div className='shop-container'>
            <div className='products-container'>
                <h2>Orders Page</h2>
            </div>
            <div>
                <Cart cart={cart}></Cart>
            </div>

        </div>
    );
};

export default Orders;