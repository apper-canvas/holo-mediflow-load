import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ 
  message = 'Something went wrong', 
  onRetry = null, 
  className = '',
  type = 'default' 
}) => {
  const getIcon = () => {
    switch (type) {
      case 'network':
        return 'WifiOff';
      case 'not-found':
        return 'Search';
      case 'permission':
        return 'Lock';
      default:
        return 'AlertCircle';
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'network':
        return 'Connection Error';
      case 'not-found':
        return 'Not Found';
      case 'permission':
        return 'Access Denied';
      default:
        return 'Error';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-lg shadow-sm border border-red-200 p-8 text-center ${className}`}
    >
      <div className="flex flex-col items-center space-y-4">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          className="w-16 h-16 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center"
        >
          <ApperIcon name={getIcon()} size={32} className="text-red-500" />
        </motion.div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">{getTitle()}</h3>
          <p className="text-gray-600 max-w-md">{message}</p>
        </div>
        
        {onRetry && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRetry}
            className="btn-hover px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            Try Again
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default Error;