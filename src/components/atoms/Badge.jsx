import React from 'react';
import { cn } from '@/utils/cn';

const Badge = React.forwardRef(({ 
  className = '', 
  variant = 'default', 
  size = 'md',
  children,
  ...props 
}, ref) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-gradient-to-r from-primary to-secondary text-white',
    success: 'bg-gradient-to-r from-success to-green-600 text-white',
    warning: 'bg-gradient-to-r from-warning to-orange-600 text-white',
    danger: 'bg-gradient-to-r from-error to-red-600 text-white',
    info: 'bg-gradient-to-r from-info to-blue-600 text-white',
    outline: 'border border-gray-300 text-gray-700 bg-white'
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1.5 text-sm',
    lg: 'px-3 py-2 text-base'
  };

  const baseClasses = 'inline-flex items-center rounded-full font-medium';

  return (
    <span
      ref={ref}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

export default Badge;