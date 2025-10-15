// Reusable badge component with color-coded variants for status display
export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info';

export interface BadgeProps {
  children: string;
  variant?: BadgeVariant;
  className?: string;
}

export default function Badge({
  children,
  variant = 'info',
  className = '',
}: BadgeProps) {
  // Map each variant to Tailwind CSS classes for consistent styling
  const variantClasses = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}