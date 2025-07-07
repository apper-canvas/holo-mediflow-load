import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addDays, subDays } from 'date-fns';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import StatusBadge from '@/components/molecules/StatusBadge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { appointmentService } from '@/services/api/appointmentService';

const AppointmentCalendar = ({ onSelectAppointment, onAddAppointment }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await appointmentService.getAll();
      setAppointments(data);
    } catch (err) {
      setError('Failed to load appointments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getAppointmentsForDate = (date) => {
return appointments.filter(apt => 
      isSameDay(new Date(apt.date), date)
    );
  };

  const selectedDateAppointments = getAppointmentsForDate(selectedDate);

  if (loading) return <Loading type="calendar" />;
  if (error) return <Error message={error} onRetry={loadAppointments} />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <Card className="lg:col-span-2 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              icon="ChevronLeft"
              onClick={() => setCurrentDate(subDays(currentDate, 30))}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon="ChevronRight"
              onClick={() => setCurrentDate(addDays(currentDate, 30))}
            />
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day) => {
            const dayAppointments = getAppointmentsForDate(day);
            const isSelected = isSameDay(day, selectedDate);
            const isCurrentDay = isToday(day);

            return (
              <motion.div
                key={day.toISOString()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedDate(day)}
                className={`
                  p-3 min-h-20 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200
                  ${isSelected ? 'bg-primary/10 border-primary' : 'hover:bg-gray-50'}
                  ${isCurrentDay ? 'bg-gradient-to-br from-primary/5 to-secondary/5' : ''}
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${
                    isCurrentDay ? 'text-primary' : 'text-gray-900'
                  }`}>
                    {format(day, 'd')}
                  </span>
                  {dayAppointments.length > 0 && (
                    <span className="text-xs bg-primary text-white rounded-full px-1.5 py-0.5">
                      {dayAppointments.length}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  {dayAppointments.slice(0, 2).map((apt) => (
                    <div
                      key={apt.Id}
                      className="text-xs p-1 bg-primary/20 text-primary rounded truncate"
                    >
                      {apt.time}
                    </div>
                  ))}
                  {dayAppointments.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{dayAppointments.length - 2} more
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Selected Date Appointments */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {format(selectedDate, 'MMM dd, yyyy')}
          </h3>
          <Button
            size="sm"
            icon="Plus"
            onClick={() => onAddAppointment(selectedDate)}
          >
            Add
          </Button>
        </div>

        <div className="space-y-3">
          {selectedDateAppointments.length === 0 ? (
            <Empty
              title="No appointments"
              message="No appointments scheduled for this date"
              icon="Calendar"
              action={() => onAddAppointment(selectedDate)}
              actionLabel="Add Appointment"
            />
          ) : (
            selectedDateAppointments.map((appointment) => (
              <motion.div
                key={appointment.Id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => onSelectAppointment(appointment)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
<p className="font-medium text-gray-900">
                      {appointment.time}
                    </p>
                    <p className="text-sm text-gray-600">
                      {appointment.patient_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {appointment.type}
                    </p>
                  </div>
                  <StatusBadge status={appointment.status} />
                </div>
              </motion.div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default AppointmentCalendar;