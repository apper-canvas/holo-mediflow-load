import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  title = 'No data available', 
  message = 'Get started by adding your first item',
  icon = 'FileText',
  action = null,
  actionLabel = 'Add New',
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center ${className}`}
    >
      <div className="flex flex-col items-center space-y-6">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center"
        >
          <ApperIcon name={icon} size={48} className="text-gray-400" />
        </motion.div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600 max-w-md">{message}</p>
        </div>
        
        {action && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={action}
            className="btn-hover px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            <ApperIcon name="Plus" size={20} className="inline mr-2" />
            {actionLabel}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default Empty;