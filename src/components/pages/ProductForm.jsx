import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation schema
import { productSchema } from "../validation/productSchema";

function ProductForm({ formData = {}, onSubmit = () => {}, editingId }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: formData,
  });


  // Only reset when editing existing product
  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      reset(formData);
    }
  }, [formData, reset]);
const inputClass =
    "peer block w-full appearance-none border rounded-md bg-white px-3 pt-4 pb-1 text-gray-900 placeholder-transparent focus:outline-none focus:ring-1 sm:text-sm";
  const errorClass = "text-sm text-red-500 mt-1";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-md rounded-lg p-6"
    >
      <h2 className="text-xl font-semibold mb-4">
        {editingId ? "Edit Product" : "Add Product"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            {...register("title")}
            className="w-full border p-2 rounded"
            placeholder="Enter product title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            {...register("price")}
            className="w-full border p-2 rounded"
            placeholder="Enter price"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            {...register("category")}
            className="w-full border p-2 rounded"
            placeholder="Enter category"
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Brand</label>
          <input
            {...register("brand")}
            className="w-full border p-2 rounded"
            placeholder="Enter brand"
          />
          {errors.brand && (
            <p className="text-red-500 text-sm">{errors.brand.message}</p>
          )}
        </div>
           {/* Thumbnail */}
      <div className="relative w-full sm:col-span-2">
        <input
          id="thumbnail"
          placeholder="Thumbnail URL"
          {...register("thumbnail")}
          className={`${inputClass}  border p-2 rounded`}
        />
        <label htmlFor="thumbnail" className="form-label ">Thumbnail URL</label>
        {errors.thumbnail && <p className={errorClass}>{errors.thumbnail.message}</p>}
      </div>
      </div>

      <button
        type="submit"
        className="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
      >
        {editingId ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}

export default ProductForm;
