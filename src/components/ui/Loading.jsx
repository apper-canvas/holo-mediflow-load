import { motion } from 'framer-motion';

const Loading = ({ type = 'default', rows = 3, className = '' }) => {
  const shimmerVariants = {
    initial: { opacity: 0.3 },
    animate: { opacity: 1 },
    exit: { opacity: 0.3 }
  };

  if (type === 'table') {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="h-12 bg-gray-50 border-b border-gray-200"></div>
          {Array.from({ length: rows }, (_, i) => (
            <motion.div
              key={i}
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              className="h-16 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100 shimmer"
            />
          ))}
        </div>
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full shimmer"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 shimmer"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 shimmer"></div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-3 bg-gray-200 rounded shimmer"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6 shimmer"></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'calendar') {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-7 gap-4 mb-4">
            {Array.from({ length: 7 }, (_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded shimmer"></div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-4">
            {Array.from({ length: 35 }, (_, i) => (
              <motion.div
                key={i}
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.02 }}
                className="h-20 bg-gray-100 rounded shimmer"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4 shimmer"></div>
          {Array.from({ length: rows }, (_, i) => (
            <motion.div
              key={i}
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              className="h-4 bg-gray-200 rounded shimmer"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;