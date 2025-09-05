import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/api";
import ProductForm from "./ProductForm.jsx";

function BeautyProducts() {
  const [page, setPage] = useState(1);
  const limit = 12; // how many per page

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", page], // ✅ depends on page
    queryFn: () => fetchProducts({ page, limit }),
    keepPreviousData: true, // ✅ keeps old data while fetching new
  });

  if (isLoading) return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (isError) return <div className="text-center mt-10 text-red-500">Error: {error.message}</div>;

  const { products, total } = data;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-5xl font-bold mb-6 text-center text-purple-400">Beauty Products</h1>

      <ProductForm />

      {/* Products Grid */}
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-10">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover" />
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
              <p className="text-pink-600 font-bold mb-1">${product.price}</p>
              <p className="text-sm text-gray-600"><b>Category:</b> {product.category}</p>
              <p className="text-sm text-gray-600"><b>Brand:</b> {product.brand}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 gap-4">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2">{page} / {totalPages}</span>
        <button
          onClick={() => setPage((old) => (old < totalPages ? old + 1 : old))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default BeautyProducts;
