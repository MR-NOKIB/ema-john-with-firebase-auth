import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(12)
    const { totalProducts } = useLoaderData();
    const [cart, setCart] = useState([]);


    const totalPages = Math.ceil(totalProducts / itemsPerPage)

    // const pageNumbers = [];
    // for (let i = 1; i <= totalPages; i++){
    //     pageNumbers.push(i);
    // }

    const pageNumbers = [...Array(totalPages).keys()];
    console.log(pageNumbers)

    // console.log(totalProducts);

    /**
     * 1.Done: Determine the total number of item:
     * 2.Todo: Decide on the number of items per page:
     * 3.Done: Calculate the total number of pages
     * 4.Done: Determine the current page
     * 5.TODO: Load the appropriate data
     * **/

    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, []);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`);
            const data = await response.json();
            setProducts(data);
        }
        fetchData();
    }, [currentPage, itemsPerPage])


    useEffect(() => {
        const storedCart = getShoppingCart();
        const ids = Object.keys(storedCart);

        fetch(`http://localhost:5000/productsByIds`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(cartProducts => {
                const savedCart = [];
                // step 1: get id of the added product
                for (const id in storedCart) {
                    // step 2: get product form the products state using id
                    const addedProducts = cartProducts.find(product => product._id === id);
                    if (addedProducts) {
                        // step 3: add quantity
                        addedProducts.quantity = storedCart[id];
                        // step 4: add the added(found) products to the saved cart
                        savedCart.push(addedProducts);
                    }
                }
                // step 5: set the cart
                setCart(savedCart);
            })



    }, [])

    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product._id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    const itemsPerPageOptions = [6, 12, 18, 21];
    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(Number(event.target.value)); // Update items per page
        setCurrentPage(0); // Reset to page 1 when changing items per page
    };


    return (
        <>
            <div className='shop-container'>
                <div className="products-container">
                    {
                        products.map(product => <Product
                            key={product._id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart
                        cart={cart}
                        handleClearCart={handleClearCart}
                    >
                        <Link className='link-decoration' to='/orders'>
                            <button className='btn-proceed'>Review Order</button>
                        </Link>
                    </Cart>
                </div>
            </div>

            {/* Pagination */}
            <div className="pagination">
                <p>Current page: {currentPage}</p>
                {
                    pageNumbers.map(number => <button
                        key={number}
                        onClick={() => setCurrentPage(number)}
                        className={currentPage === number ? "selected" : ''}
                    >{number + 1}</button>)
                }
                <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                    {itemsPerPageOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default Shop;