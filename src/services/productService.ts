import axios from 'axios';
import type { Product } from '../types/Product';

const api = axios.create({
  baseURL: '/api',
});

export const getProducts = () =>
  api.get<Product[]>('/products').then(res => res.data);