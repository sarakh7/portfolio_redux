import config from "./config.json";
import axios from 'axios';


// @desc Get All Products
// @route Get http://localhost:9000/products
export const getAllProducts = () => {
    const url = `${config.SERVER_URL}/products`;
    return axios.get(url);
}

// @desc Create Product
// @route Post http://localhost:9000/products
export const createProduct = (value) => {
    const url = `${config.SERVER_URL}/products`;
    return axios.post(url, value);
}

// @desc Delete Product
// @route Delete http://localhost:9000/products
export const deleteProduct = (productId) => {
    const url = `${config.SERVER_URL}/products/${productId}`;
    return axios.delete(url);
}

// @desc Update Product
// @route Put http://localhost:9000/products
export const updateProduct = (productId, value) => {
    const url = `${config.SERVER_URL}/products/${productId}`;
    return axios.put(url, value);
}