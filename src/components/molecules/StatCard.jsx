import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend = null, 
  color = 'primary',
  className = '' 
}) => {
  const colors = {
    primary: 'from-primary to-secondary',
    success: 'from-success to-green-600',
    warning: 'from-warning to-orange-600',
    danger: 'from-error to-red-600',
    info: 'from-info to-blue-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      <Card className="p-6 h-full">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold gradient-text">{value}</p>
            {trend && (
              <div className="flex items-center mt-2">
                <ApperIcon 
                  name={trend > 0 ? 'TrendingUp' : 'TrendingDown'} 
                  size={16} 
                  className={trend > 0 ? 'text-green-500' : 'text-red-500'} 
                />
                <span className={`text-sm ml-1 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {Math.abs(trend)}%
                </span>
              </div>
            )}
          </div>
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${colors[color]} flex items-center justify-center`}>
            <ApperIcon name={icon} size={24} className="text-white" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default StatCard;