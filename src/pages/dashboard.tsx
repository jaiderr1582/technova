// Enhanced dashboard with modern UI and integrated product management logic
import { useState } from 'react';
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

  // Redirect to login if not authenticated
  if (!user) {
    router.push('/login');
    return null;
  }

  const handleCreate = async () => {
    setIsCreating(true);
    try {
      // Simulate opening a form or modal; here we create a demo product
      await addProduct({
        sku: 'TEC-' + Date.now().toString().slice(-4),
        name: 'Nuevo Producto',
        brand: 'Marca Ejemplo',
        category: 'Accesorios',
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top navigation bar with user info and logout */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">TechNova</h1>
            <p className="text-sm text-gray-500">Gestión de Catálogo</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">Administrador</p>
            </div>
            <Button variant="secondary" size="sm" onClick={logout}>
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Productos</h2>
            <p className="mt-1 text-sm text-gray-600">
              Gestiona tu catálogo de productos tecnológicos
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={handleCreate}
            disabled={isCreating}
          >
            {isCreating ? 'Creando...' : '+ Agregar Producto'}
          </Button>
        </div>

        {/* Loading, error, empty, or product grid */}
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
            <h3 className="text-lg font-medium text-gray-900 mb-1">No hay productos</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Comienza agregando tu primer producto tecnológico al catálogo.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard
                key={product.id}
                title={product.name}
                price={product.price}
                category={product.category}
                isActive={product.isActive}
                onEdit={() => alert(`Editar: ${product.name}`)}
                onDelete={() => removeProduct(product.id!)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}