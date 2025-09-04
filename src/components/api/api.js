import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchProducts = async () => {
  const { data } = await axios.get(`${API_URL}?limit=10`);
  return data.products;
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
