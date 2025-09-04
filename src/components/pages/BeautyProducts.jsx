// src/components/pages/BeautyProducts.jsx

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProducts } from '../api/api';
import ProductForm from "./ProductForm.jsx"

function BeautyProducts() {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    brand: '',
    category: '',
    thumbnail: ''
  });
  const [editingId, setEditingId] = useState(null);

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  // Mutations
  const mutation = useMutation({
    mutationFn: async (newProduct) => {
      const res = await axios.post('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;
    mutation.mutate(formData);
    setFormData({
      title: '',
      price: '',
      brand: '',
      category: '',
      thumbnail: ''
    });
    setEditingId(null);
  };

  if (isLoading) return <div className="text-center mt-10 text-lg font-medium">Loading...</div>;
  if (isError) return <div className="text-center mt-10 text-red-500">Error: {error.message}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-5xl font-bold mb-6 text-center text-purple-400">Beauty Products</h1>

      <ProductForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        editingId={editingId}
      />

      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-10">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
              <p className="text-pink-600 font-bold mb-1">${product.price}</p>
              <p className="text-sm text-gray-600"><b>Category:</b> {product.category}</p>
              <p className="text-sm text-gray-600"><b>Brand:</b> {product.brand}</p>
            </div>
            <div className='flex gap-5 justify-center items-center mb-3'>
                <button className='bg-pink-300 p-2 rounded-xl cursor-pointer'>Update</button>
                   <button className='bg-red-400 p-2 rounded-xl cursor-pointer'>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BeautyProducts;
