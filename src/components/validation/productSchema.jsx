// src/validations/productSchema.js
import * as yup from "yup";

export const productSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(5, "Must be greater than 5"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),
  brand: yup.string().required("Brand is required"),
  category: yup.string().required("Category is required"),
  thumbnail: yup
    .string()
    .url("Enter a valid URL")
    .required("Thumbnail URL is required"),
});
