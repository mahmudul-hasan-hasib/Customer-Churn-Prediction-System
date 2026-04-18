import { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'low' | 'medium' | 'high' | 'success' | 'warning' | 'danger' | 'info' | 'default';
}

export function Badge({ variant = 'default', className = '', children, ...props }: BadgeProps) {
  const variants = {
    low: 'bg-emerald-50 text-emerald-700 border-emerald-200/50 shadow-sm',
    medium: 'bg-amber-50 text-amber-700 border-amber-200/50 shadow-sm',
    high: 'bg-rose-50 text-rose-700 border-rose-200/50 shadow-sm',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200/50 shadow-sm',
    warning: 'bg-amber-50 text-amber-700 border-amber-200/50 shadow-sm',
    danger: 'bg-rose-50 text-rose-700 border-rose-200/50 shadow-sm',
    info: 'bg-blue-50 text-blue-700 border-blue-200/50 shadow-sm',
    default: 'bg-slate-50 text-slate-700 border-slate-200/50 shadow-sm',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
