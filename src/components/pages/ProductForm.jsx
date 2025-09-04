import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { productSchema } from "../validation/productSchema"

function ProductForm({ formData = {}, setFormData, onSubmit, editingId }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: formData,
  });

  // Sync the formData when editing
  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  const submitHandler = (data) => {
    onSubmit(data);
  };

  const inputClass =
    "peer block w-full appearance-none border rounded-md bg-white px-3 pt-4 pb-1 text-gray-900 placeholder-transparent focus:outline-none focus:ring-1 sm:text-sm";
  const errorClass = "text-sm text-red-500 mt-1";

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-200 mb-12"
    >
      {/* Title */}
      <div className="relative w-full">
        <input
          id="title"
          placeholder="Title"
          {...register("title")}
          className={`${inputClass} border-gray-300 focus:border-purple-500 focus:ring-purple-500`}
        />
        <label htmlFor="title" className="form-label">Product Title</label>
        {errors.title && <p className={errorClass}>{errors.title.message}</p>}
      </div>

      {/* Price */}
      <div className="relative w-full">
        <input
          id="price"
          type="number"
          placeholder="Price"
          {...register("price")}
          className={`${inputClass} border-gray-300 focus:border-purple-500 focus:ring-purple-500`}
        />
        <label htmlFor="price" className="form-label">Price ($)</label>
        {errors.price && <p className={errorClass}>{errors.price.message}</p>}
      </div>

      {/* Brand */}
      <div className="relative w-full">
        <input
          id="brand"
          placeholder="Brand"
          {...register("brand")}
          className={`${inputClass} border-gray-300 focus:border-purple-500 focus:ring-purple-500`}
        />
        <label htmlFor="brand" className="form-label">Brand</label>
        {errors.brand && <p className={errorClass}>{errors.brand.message}</p>}
      </div>

      {/* Category */}
      <div className="relative w-full">
        <input
          id="category"
          placeholder="Category"
          {...register("category")}
          className={`${inputClass} border-gray-300 focus:border-purple-500 focus:ring-purple-500`}
        />
        <label htmlFor="category" className="form-label">Category</label>
        {errors.category && <p className={errorClass}>{errors.category.message}</p>}
      </div>

      {/* Thumbnail */}
      <div className="relative w-full sm:col-span-2">
        <input
          id="thumbnail"
          placeholder="Thumbnail URL"
          {...register("thumbnail")}
          className={`${inputClass} border-gray-300 focus:border-purple-500 focus:ring-purple-500`}
        />
        <label htmlFor="thumbnail" className="form-label">Thumbnail URL</label>
        {errors.thumbnail && <p className={errorClass}>{errors.thumbnail.message}</p>}
      </div>

      {/* Submit Button */}
      <div className="sm:col-span-2 flex justify-center items-center">
        <button
          type="submit"
          className="w-full max-w-xs bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-md transition-colors cursor-pointer"
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
