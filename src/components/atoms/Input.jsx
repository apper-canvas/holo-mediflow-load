import React from 'react';
import { cn } from '@/utils/cn';
import ApperIcon from '@/components/ApperIcon';

const Input = React.forwardRef(({ 
  className = '', 
  type = 'text', 
  icon = null,
  iconPosition = 'left',
  error = false,
  errorMessage = '',
  ...props 
}, ref) => {
  const baseClasses = 'flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
  
  const errorClasses = error ? 'border-red-500 focus:ring-red-500' : '';
  
  const iconClasses = icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : '';

  return (
    <div className="relative">
      {icon && (
        <div className={cn(
          'absolute inset-y-0 flex items-center pointer-events-none',
          iconPosition === 'left' ? 'left-3' : 'right-3'
        )}>
          <ApperIcon name={icon} size={16} className={cn(
            error ? 'text-red-500' : 'text-gray-400'
          )} />
        </div>
      )}
      <input
        type={type}
        ref={ref}
        className={cn(
          baseClasses,
          errorClasses,
          iconClasses,
          className
        )}
        {...props}
      />
      {error && errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;