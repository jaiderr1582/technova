// Reusable product card displaying key info and action buttons
import Button from './Buttons';
import Badge from './Badge';

type CardProps = {
  title: string;
  price: number;
  category: string;
  isActive: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

export default function ProductCard({
  title,
  price,
  category,
  isActive,
  onEdit,
  onDelete,
}: CardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="font-bold">{title}</h3>
      <p className="text-gray-600">${price.toFixed(2)}</p>
      <div className="mt-2 flex justify-between items-center">
        {/* Status badge showing active/inactive state */}
        <Badge variant={isActive ? 'success' : 'warning'}>
          {isActive ? 'Activo' : 'Inactivo'}
        </Badge>
        <span className="text-sm text-gray-500">{category}</span>
      </div>
      <div className="mt-4 flex gap-2">
        {/* Action buttons for editing and deleting the product */}
        <Button size="sm" onClick={onEdit}>Editar</Button>
        <Button variant="secondary" size="sm" onClick={onDelete}>Eliminar</Button>
      </div>
    </div>
  );
}