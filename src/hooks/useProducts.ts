import { useState, useEffect } from 'react';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/productService';
import type { Product } from '../types/Product';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all products on mount and expose a refetch function
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // Create a new product and update local state optimistically
  const addProduct = async (product: Omit<Product, 'id' | 'createdAt'>) => {
    try {
      const newProduct = await createProduct(product);
      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (err: any) {
      throw new Error(err.message || 'Failed to create product');
    }
  };

  // Update an existing product by ID and sync local state
  const editProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const updated = await updateProduct(id, updates);
      setProducts(prev =>
        prev.map(p => (p.id === id ? { ...p, ...updated } : p))
      );
      return updated;
    } catch (err: any) {
      throw new Error(err.message || 'Failed to update product');
    }
  };

  // Delete a product and remove it from local state
  const removeProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      throw new Error(err.message || 'Failed to delete product');
    }
  };

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
    addProduct,
    editProduct,
    removeProduct,
  };
}