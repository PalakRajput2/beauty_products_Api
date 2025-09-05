import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

// ------------------------------
// Fetch Products (paginated)
// ------------------------------
export const fetchProducts = async ({ page, limit }) => {
  const res = await axios.get(
    `${API_URL}?limit=${limit}&skip=${(page - 1) * limit}`
  );

  return {
    products: res.data.products,
    total: res.data.total,
  };
};

// ------------------------------
// Add Product
// ------------------------------
export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProduct) => {
      return {
        id: Date.now(), // fake id
        ...newProduct,
      };
    },
    onSuccess: (data) => {
      // 🔹 Update cache for *all* pages (prepend only to first page)
      queryClient.setQueriesData({ queryKey: ["products"], exact: false }, (old) => {
        if (!old) return old;

        return {
          ...old,
          products:
            old.products && old.products.length
              ? [data, ...old.products] // add to current cache
              : [data],
          total: (old.total || 0) + 1,
        };
      });
    },
  });
};

// ------------------------------
// Edit Product
// ------------------------------
export const useEditProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedProduct) => {
      return updatedProduct;
    },
    onSuccess: (data) => {
      queryClient.setQueriesData({ queryKey: ["products"], exact: false }, (old) => {
        if (!old) return old;

        return {
          ...old,
          products: old.products.map((p) =>
            p.id === data.id ? { ...p, ...data } : p
          ),
        };
      });
    },
  });
};

// ------------------------------
// Delete Product
// ------------------------------
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      return id;
    },
    onSuccess: (id) => {
      queryClient.setQueriesData({ queryKey: ["products"], exact: false }, (old) => {
        if (!old) return old;

        return {
          ...old,
          products: old.products.filter((p) => p.id !== id),
          total: old.total - 1,
        };
      });
    },
  });
};
