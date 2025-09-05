import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Fetch products with pagination
export const fetchProducts = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const { data } = await axios.get(`${API_URL}?limit=${limit}&skip=${skip}`);
  return {
    products: data.products,
    total: data.total,
    limit: data.limit,
    skip: data.skip,
  };
};


export const addProduct = async (product) => {
  const { data } = await axios.post(API_URL, product);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};

export const updateProduct = async ({ id, updatedProduct }) => {
  const { data } = await axios.put(`${API_URL}/${id}`, updatedProduct);
  return data;
};
