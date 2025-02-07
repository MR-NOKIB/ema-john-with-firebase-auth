import React from 'react';
import './Cart.css'

const Cart = ({ cart }) => {
    // const cart = props.cart;#
    let totalPrice = 0;
    let totalShipping = 0;
    let totalQuantity = 0;
    for (const product of cart) {
        if(product.quantity){
            product.quantity = 1;
        }
        totalPrice = totalPrice + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping * product.quantity;
        totalQuantity = totalQuantity + product.quantity;
        console.log(product)
    }
    const tax = totalPrice * 7 / 100;
    const grandTotal = totalPrice + totalShipping + tax;
    return (
        <div className='cart'>
            <h4>Order Summary</h4>
            <p>Selected Items: {totalQuantity}</p>
            <p>Total Price: ${totalPrice}</p>
            <p>Total Shipping Charge: ${totalShipping}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <h6 className='grand-total'>Grand Total: ${grandTotal.toFixed(2)}</h6>
        </div>
    );
};

export default Cart;