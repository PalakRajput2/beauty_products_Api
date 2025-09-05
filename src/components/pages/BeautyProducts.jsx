import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/api";
import ProductForm from "./ProductForm.jsx";
import Pagination from "../ui/Pagination.jsx";

function BeautyProducts() {
  const [page, setPage] = useState(1);
  const limit = 12; // products per page

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchProducts({ page, limit }),
    keepPreviousData: true,
  });

  if (isLoading)
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (isError)
    return (
      <div className="text-center mt-10 text-red-500">
        Error: {error.message}
      </div>
    );

  const { products, total } = data;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-5xl font-bold mb-6 text-center text-purple-400">
        Shop Products
      </h1>

      {/* Product Form (for future use, e.g., add/edit products) */}
      <ProductForm />

      {/* Products Grid */}
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-10">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
              <p className="text-pink-600 font-bold mb-1">${product.price}</p>
              <p className="text-sm text-gray-600">
                <b>Category:</b> {product.category}
              </p>
              <p className="text-sm text-gray-600">
                <b>Brand:</b> {product.brand}
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 p-4">
                    <button className="bg-green-300 w-20 rounded-xl h-10 cursor-pointer hover:bg-green-400">Edit</button>
            <button className="bg-red-300 w-20 rounded-xl h-10 cursor-pointer hover:bg-red-400" >Delete</button>
        
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}

export default BeautyProducts;
