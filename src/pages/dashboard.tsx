import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Buttons';
import ProductCard from '@/components/ui/Card';
import { getProducts } from '../services/productService';
import type { Product } from '../types/Product';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirigir si no hay usuario
    if (!user) {
      router.push('/login');
      return;
    }

    loadProducts();
  }, [user, router]);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      alert('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar producto?')) return;
    try {
      // Aquí iría deleteProduct(id) cuando lo implementes
      alert('Producto eliminado (simulado)');
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert('Error al eliminar');
    }
  };

  if (loading) return <div className="p-6">Cargando...</div>;

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard - TechNova</h1>
        <div>
          <span className="mr-4">Hola, {user?.name}</span>
          <Button onClick={logout} variant="secondary">Cerrar sesión</Button>
        </div>
      </header>

      <div className="mb-6">
        <Button variant="primary">+ Nuevo Producto</Button>
      </div>

      {products.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard
              key={product.id}
              title={product.name}
              price={product.price}
              category={product.category}
              isActive={product.isActive}
              onEdit={() => alert('Editar ' + product.name)}
              onDelete={() => handleDelete(product.id!)}
            />
          ))}
        </div>
      )}
    </div>
  );
}