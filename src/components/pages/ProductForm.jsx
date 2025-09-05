
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../validation/productSchema";

function ProductForm({ formData = {}, onSubmit, editingId, onFinish }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: formData,
  });

  // Reset form whenever formData changes
  useEffect(() => {
    reset(formData);
  }, [formData, reset]);
const submitHandler = (data) => {
  onSubmit({ ...data, id: editingId || Date.now() });

  reset({
    title: "",
    price: "",
    brand: "",
    category: "",
    thumbnail: "",
  });

  if (onFinish) onFinish();
};

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-4 max-w-lg mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-10"
    >
      <h2 className="text-2xl font-bold text-purple-500 mb-4 text-center">
        {editingId ? "Edit Product" : "Add Product"}
      </h2>

      {/* Title */}
      <div>
        <input
          {...register("title")}
          placeholder="Product Title"
          className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-purple-400"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* Price */}
      <div>
        <input
          {...register("price")}
          type="number"
          placeholder="Price"
          className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-purple-400"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      {/* Brand */}
      <div>
        <input
          {...register("brand")}
          placeholder="Brand"
          className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-purple-400"
        />
        {errors.brand && (
          <p className="text-red-500 text-sm">{errors.brand.message}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <input
          {...register("category")}
          placeholder="Category"
          className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-purple-400"
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      {/* Thumbnail */}
      <div>
        <input
          {...register("thumbnail")}
          placeholder="Thumbnail URL"
          className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-purple-400"
        />
        {errors.thumbnail && (
          <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-md transition"
      >
        {editingId ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}

export default ProductForm;
