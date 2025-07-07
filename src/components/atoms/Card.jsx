import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const Card = React.forwardRef(({ 
  className = '', 
  hover = false,
  gradient = false,
  children,
  ...props 
}, ref) => {
  const baseClasses = 'bg-white rounded-lg border border-gray-200 shadow-sm';
  const hoverClasses = hover ? 'card-hover cursor-pointer' : '';
  const gradientClasses = gradient ? 'bg-gradient-to-br from-white to-gray-50' : '';

  const Component = hover ? motion.div : 'div';

  return (
    <Component
      ref={ref}
      className={cn(
        baseClasses,
        hoverClasses,
        gradientClasses,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});

Card.displayName = 'Card';

export default Card;