// src/api/api.js
import axios from "axios";

const API_URL = "https://dummyjson.com/products"; // adjust your backend

// GET products
export const fetchProducts = async ({ page, limit }) => {
  const res = await axios.get(`${API_URL}?_page=${page}&_limit=${limit}`);
  return {
    products: res.data,
    total: parseInt(res.headers["x-total-count"], 10), // json-server style
  };
};

// CREATE product
export const createProduct = async (product) => {
  const res = await axios.post(API_URL, product);
  return res.data;
};

// UPDATE product
export const updateProduct = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

// DELETE product
export const deleteProduct = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};
