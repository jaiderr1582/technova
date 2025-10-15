import axios from 'axios';
import type { Product } from '../types/Product';

const api = axios.create({
  baseURL: '/api',
});

export const getProducts = () =>
  api.get<Product[]>('/products').then(res => res.data);

export const createProduct = (product: Omit<Product, 'id' | 'createdAt'>) =>
  api.post<Product>('/products', product).then(res => res.data);

export const updateProduct = (id: string, product: Partial<Product>) =>
  api.put<Product>(`/products/${id}`, product).then(res => res.data);

export const deleteProduct = (id: string) =>
  api.delete(`/products/${id}`).then(res => res.data);