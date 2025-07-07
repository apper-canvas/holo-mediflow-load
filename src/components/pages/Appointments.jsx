import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import AppointmentCalendar from '@/components/organisms/AppointmentCalendar';
import ApperIcon from '@/components/ApperIcon';

const Appointments = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSelectAppointment = (appointment) => {
    console.log('Selected appointment:', appointment);
    // Handle appointment selection
  };

  const handleAddAppointment = (date) => {
    console.log('Add appointment for date:', date);
    // Handle add appointment
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600">Manage your appointment schedule and calendar</p>
        </div>
        <Button
          onClick={() => handleAddAppointment(new Date())}
          icon="Calendar"
          className="bg-gradient-to-r from-primary to-secondary"
        >
          Schedule Appointment
        </Button>
      </motion.div>

      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <AppointmentCalendar
          key={refreshKey}
          onSelectAppointment={handleSelectAppointment}
          onAddAppointment={handleAddAppointment}
        />
      </motion.div>
    </div>
  );
};

export default Appointments;