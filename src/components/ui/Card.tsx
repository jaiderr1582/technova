// Reusable product card with enhanced visual design and clear status indicators
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
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 p-5">
      <h3 className="font-semibold text-gray-900 text-lg truncate">{title}</h3>
      <p className="text-lg font-bold text-indigo-600 mt-1">${price.toFixed(2)}</p>
      
      <div className="mt-3 flex justify-between items-center">
        {/* Status badge with refined color scheme */}
        <Badge variant={isActive ? 'success' : 'warning'}>
          {isActive ? 'Active' : 'Inactive'}
        </Badge>
        <span className="text-sm text-gray-500 font-medium">{category}</span>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex gap-2">
        {/* Action buttons with consistent styling and spacing */}
        <Button size="sm" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="danger" size="sm" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}