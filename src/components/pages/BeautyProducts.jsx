import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchProducts,
  useAddProduct,
  useEditProduct,
  useDeleteProduct,
} from "../hooks/handleApi";
import ProductForm from "./ProductForm.jsx";
import Pagination from "../ui/Pagination.jsx";

function BeautyProducts() {
  const [page, setPage] = useState(1);
  const limit = 12;

  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchProducts({ page, limit }),
    keepPreviousData: true,
  });

  const addMutation = useAddProduct();
  const editMutation = useEditProduct();
  const deleteMutation = useDeleteProduct();

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

  //  Handle add / update
  const handleFormSubmit = (newProduct) => {
    if (editingId) {
      editMutation.mutate(newProduct);
    } else {
      addMutation.mutate(newProduct);
    }
    setEditingId(null);
    setFormData({});
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll up after submit
  };

  // Handle edit click
  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData(product);
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll up on edit
  };

  //  Handle delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-5xl font-bold mb-6 text-center text-purple-500">
        Shop Products
      </h1>

      {/* Product Form */}
    <ProductForm
  formData={formData}
  onSubmit={handleFormSubmit}
  editingId={editingId}
  onFinish={() => {
    // ✅ clear editing state
    setEditingId(null);
    setFormData({});
  }}
/>


      {/* Products Grid */}
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-10">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 flex-1">
              <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
              <p className="text-pink-600 font-bold mb-1">${product.price}</p>
              <p className="text-sm text-gray-600">
                <b>Category:</b> {product.category}
              </p>
              <p className="text-sm text-gray-600">
                <b>Brand:</b> {product.brand}
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 border-t">
              <button
                onClick={() => handleEdit(product)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
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
