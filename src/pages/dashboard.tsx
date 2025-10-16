// Enhanced dashboard with modern UI and integrated product management logic
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useProducts } from '../hooks/useProducts';
import Button from '@/components/ui/Buttons';
import ProductCard from '@/components/ui/Card';
import { useRouter } from 'next/router';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { products, loading, error, addProduct, removeProduct } = useProducts();
  const [isCreating, setIsCreating] = useState(false);

  // Redirect to login page if user is not authenticated (client-side only)
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  // Handle product creation with optimistic UI update and error handling
  const handleCreate = async () => {
    setIsCreating(true);
    try {
      await addProduct({
        sku: 'TEC-' + Date.now().toString().slice(-4),
        name: 'New Product',
        brand: 'Example Brand',
        category: 'Accessories',
        price: 99.99,
        quantity: 10,
        isActive: true,
        imageUrl: '',
      });
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsCreating(false);
    }
  };

  // Show loading state while products are being fetched
  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top navigation bar with user info and logout button */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">TechNova</h1>
            <p className="text-sm text-gray-500">Product Catalog Management</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <Button variant="secondary" size="sm" onClick={logout}>
              Log out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Products</h2>
            <p className="mt-1 text-sm text-gray-600">
              Manage your tech product catalog
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={handleCreate}
            disabled={isCreating}
          >
            {isCreating ? 'Creating...' : '+ Add Product'}
          </Button>
        </div>

        {/* Render loading, error, empty state, or product grid */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg text-center">
            {error}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Start by adding your first tech product to the catalog.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard
                key={product._id}
                title={product.name}
                price={product.price}
                category={product.category}
                isActive={product.isActive}
                onEdit={() => alert(`Edit: ${product.name}`)}
                onDelete={() => removeProduct(product._id!)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}