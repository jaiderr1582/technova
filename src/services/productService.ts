import axios from 'axios';
import type { Product } from '../types/Product';

// Create an Axios instance with a base URL for all product-related API calls
const api = axios.create({
  baseURL: '/api',
});

// Fetch all products from the API with full TypeScript typing
export const getProducts = () =>
  api.get<Product[]>('/products').then(res => res.data);

// Create a new product; omit auto-generated fields like 'id' and 'createdAt'
export const createProduct = (product: Omit<Product, 'id' | 'createdAt'>) =>
  api.post<Product>('/products', product).then(res => res.data);

// Update an existing product by ID using partial data
export const updateProduct = (id: string, product: Partial<Product>) =>
  api.put<Product>(`/products/${id}`, product).then(res => res.data);

// Delete a product by its ID and return the response
export const deleteProduct = (id: string) =>
  api.delete(`/products/${id}`).then(res => res.data);