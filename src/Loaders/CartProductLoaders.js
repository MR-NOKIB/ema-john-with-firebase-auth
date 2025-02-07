import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
    const loadedProducts = await fetch('products.json')
    const products = await loadedProducts.json();

    const storedCart = getShoppingCart();
    const savedCart = [];
    for (const id in storedCart) {
        const addedProducts = products.find(pd => pd.id === id)
        if(addedProducts){
            addedProducts.quantity = storedCart[id];
            savedCart.push(addedProducts);
        }
    }
    // console.log(savedCart);
    return savedCart;
}


export default cartProductsLoader;