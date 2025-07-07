import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import ApperIcon from '@/components/ApperIcon';

const Button = React.forwardRef(({ 
  className = '', 
  variant = 'default', 
  size = 'md', 
  icon = null,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  children,
  ...props 
}, ref) => {
  const variants = {
    default: 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-gray-600 hover:bg-gray-100',
    success: 'bg-gradient-to-r from-success to-green-600 text-white hover:shadow-lg',
    danger: 'bg-gradient-to-r from-error to-red-600 text-white hover:shadow-lg',
    secondary: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:shadow-lg'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const baseClasses = 'btn-hover inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-ring disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      disabled={disabled || loading}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && (
        <ApperIcon name="Loader" size={16} className="animate-spin mr-2" />
      )}
      {icon && iconPosition === 'left' && !loading && (
        <ApperIcon name={icon} size={16} className="mr-2" />
      )}
      {children}
      {icon && iconPosition === 'right' && !loading && (
        <ApperIcon name={icon} size={16} className="ml-2" />
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;