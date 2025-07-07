import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StatCard from '@/components/molecules/StatCard';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import StatusBadge from '@/components/molecules/StatusBadge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { patientService } from '@/services/api/patientService';
import { appointmentService } from '@/services/api/appointmentService';
import { format, isToday, isTomorrow } from 'date-fns';

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      const [patientsData, appointmentsData] = await Promise.all([
        patientService.getAll(),
        appointmentService.getAll()
      ]);
      setPatients(patientsData);
      setAppointments(appointmentsData);
    } catch (err) {
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const todaysAppointments = appointments.filter(apt => 
    isToday(new Date(apt.date))
  );

  const tomorrowsAppointments = appointments.filter(apt => 
    isTomorrow(new Date(apt.date))
  );

  const recentPatients = patients.slice(-5);

  const stats = [
    {
      title: 'Total Patients',
      value: patients.length,
      icon: 'Users',
      color: 'primary'
    },
    {
      title: "Today's Appointments",
      value: todaysAppointments.length,
      icon: 'Calendar',
      color: 'success'
    },
    {
      title: 'This Week',
      value: appointments.filter(apt => {
        const aptDate = new Date(apt.date);
        const today = new Date();
        const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
        return aptDate >= weekStart;
      }).length,
      icon: 'Clock',
      color: 'info'
    },
    {
      title: 'Pending Results',
      value: Math.floor(Math.random() * 10) + 1,
      icon: 'FileText',
      color: 'warning'
    }
  ];

  if (loading) return <Loading rows={6} />;
  if (error) return <Error message={error} onRetry={loadDashboardData} />;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">Welcome back, Dr. Smith!</h1>
        <p className="text-blue-100">
          You have {todaysAppointments.length} appointments today and {tomorrowsAppointments.length} tomorrow.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Today's Appointments</h2>
            <Button variant="outline" size="sm" icon="Calendar">
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {todaysAppointments.length === 0 ? (
              <Empty
                title="No appointments today"
                message="Enjoy your free day!"
                icon="Coffee"
              />
            ) : (
              todaysAppointments.slice(0, 5).map((appointment) => (
                <motion.div
                  key={appointment.Id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                      <ApperIcon name="Clock" size={16} className="text-white" />
                    </div>
                    <div>
<p className="font-medium text-gray-900">{appointment.time}</p>
                      <p className="text-sm text-gray-600">{appointment.patient_name}</p>
                      <p className="text-sm text-gray-500">{appointment.type}</p>
                    </div>
                  </div>
                  <StatusBadge status={appointment.status} />
                </motion.div>
              ))
            )}
          </div>
        </Card>

        {/* Recent Patients */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Patients</h2>
            <Button variant="outline" size="sm" icon="Users">
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentPatients.length === 0 ? (
              <Empty
                title="No patients yet"
                message="Add your first patient to get started"
                icon="UserPlus"
              />
            ) : (
              recentPatients.map((patient) => (
                <motion.div
                  key={patient.Id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-success to-green-600 rounded-full flex items-center justify-center">
                      <ApperIcon name="User" size={16} className="text-white" />
                    </div>
                    <div>
<p className="font-medium text-gray-900">
                        {patient.first_name} {patient.last_name}
                      </p>
                      <p className="text-sm text-gray-600">{patient.phone}</p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(patient.date_of_birth), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" icon="ArrowRight" />
                </motion.div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="h-20 flex-col"
            icon="UserPlus"
          >
            <span className="mt-2">Add New Patient</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col"
            icon="Calendar"
          >
            <span className="mt-2">Schedule Appointment</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col"
            icon="FileText"
          >
            <span className="mt-2">View Records</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;