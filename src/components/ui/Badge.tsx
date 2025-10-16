// Reusable badge component with refined styling and visual hierarchy
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
  // Map each variant to a refined Tailwind color palette with subtle borders
  const variantClasses = {
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200',
    info: 'bg-blue-50 text-blue-700 border border-blue-200',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}