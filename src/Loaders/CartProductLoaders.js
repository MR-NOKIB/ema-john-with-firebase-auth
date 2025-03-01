import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);
    console.log(ids)
    const loadedProducts = await fetch(`http://localhost:5000/productsByIds`, {
        method: 'POST',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(ids)
    });
    const products = await loadedProducts.json();

    
    const savedCart = [];
    for (const id in storedCart) {
        const addedProducts = products.find(pd => pd._id === id)
        if (addedProducts) {
            addedProducts.quantity = storedCart[id];
            savedCart.push(addedProducts);
        }
    }
    // console.log(savedCart);
    return savedCart;
}


export default cartProductsLoader;