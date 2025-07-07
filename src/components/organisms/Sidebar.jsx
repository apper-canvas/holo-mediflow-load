import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { path: '/', icon: 'LayoutDashboard', label: 'Dashboard' },
    { path: '/patients', icon: 'Users', label: 'Patients' },
    { path: '/appointments', icon: 'Calendar', label: 'Appointments' },
    { path: '/records', icon: 'FileText', label: 'Medical Records' },
    { path: '/reports', icon: 'BarChart3', label: 'Reports' }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 w-64 h-full bg-white border-r border-gray-200 z-30">
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="Activity" size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold gradient-text">MediFlow</h1>
          </div>
        </div>
        
        <nav className="mt-8">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors duration-200 ${
                  isActive ? 'bg-primary/10 text-primary border-r-4 border-primary' : ''
                }`
              }
            >
              <ApperIcon name={item.icon} size={20} className="mr-3" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="relative w-64 bg-white h-full shadow-lg"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                    <ApperIcon name="Activity" size={20} className="text-white" />
                  </div>
                  <h1 className="text-xl font-bold gradient-text">MediFlow</h1>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ApperIcon name="X" size={20} />
                </button>
              </div>
            </div>
            
            <nav className="mt-8">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors duration-200 ${
                      isActive ? 'bg-primary/10 text-primary border-r-4 border-primary' : ''
                    }`
                  }
                >
                  <ApperIcon name={item.icon} size={20} className="mr-3" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Sidebar;