import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import StatCard from '@/components/molecules/StatCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import { patientService } from '@/services/api/patientService';
import { appointmentService } from '@/services/api/appointmentService';
import { recordService } from '@/services/api/recordService';

const Reports = () => {
  const [data, setData] = useState({
    patients: [],
    appointments: [],
    records: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadReportData();
  }, []);

  const loadReportData = async () => {
    try {
      setLoading(true);
      setError('');
      const [patients, appointments, records] = await Promise.all([
        patientService.getAll(),
        appointmentService.getAll(),
        recordService.getAll()
      ]);
      setData({ patients, appointments, records });
    } catch (err) {
      setError('Failed to load report data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading rows={8} />;
  if (error) return <Error message={error} onRetry={loadReportData} />;

  const completedAppointments = data.appointments.filter(apt => apt.status === 'Completed').length;
  const cancelledAppointments = data.appointments.filter(apt => apt.status === 'Cancelled').length;
  const mostCommonDiagnosis = data.records.reduce((acc, record) => {
    acc[record.diagnosis] = (acc[record.diagnosis] || 0) + 1;
    return acc;
  }, {});

  const topDiagnosis = Object.entries(mostCommonDiagnosis)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

const ageGroups = data.patients.reduce((acc, patient) => {
    const age = new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear();
    if (age < 18) acc['Under 18']++;
    else if (age < 30) acc['18-30']++;
    else if (age < 50) acc['31-50']++;
    else if (age < 65) acc['51-65']++;
    else acc['65+']++;
    return acc;
  }, { 'Under 18': 0, '18-30': 0, '31-50': 0, '51-65': 0, '65+': 0 });

  const reportStats = [
    {
      title: 'Total Patients',
      value: data.patients.length,
      icon: 'Users',
      color: 'primary'
    },
    {
      title: 'Total Appointments',
      value: data.appointments.length,
      icon: 'Calendar',
      color: 'success'
    },
    {
      title: 'Completed Visits',
      value: completedAppointments,
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      title: 'Medical Records',
      value: data.records.length,
      icon: 'FileText',
      color: 'info'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">View practice statistics and patient analytics</p>
        </div>
        <Button
          icon="Download"
          className="bg-gradient-to-r from-primary to-secondary"
        >
          Export Report
        </Button>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportStats.map((stat, index) => (
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
        {/* Top Diagnoses */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Most Common Diagnoses</h2>
          <div className="space-y-3">
            {topDiagnosis.map(([diagnosis, count]) => (
              <div key={diagnosis} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                    <ApperIcon name="Activity" size={16} className="text-white" />
                  </div>
                  <span className="font-medium text-gray-900">{diagnosis}</span>
                </div>
                <span className="text-sm font-semibold text-gray-600">{count} cases</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Patient Age Distribution */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Age Distribution</h2>
          <div className="space-y-3">
            {Object.entries(ageGroups).map(([ageGroup, count]) => (
              <div key={ageGroup} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-success to-green-600 rounded-full flex items-center justify-center">
                    <ApperIcon name="Users" size={16} className="text-white" />
                  </div>
                  <span className="font-medium text-gray-900">{ageGroup}</span>
                </div>
                <span className="text-sm font-semibold text-gray-600">{count} patients</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Appointment Status */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointment Statistics</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <ApperIcon name="CheckCircle" size={20} className="text-green-600" />
                <span className="font-medium text-gray-900">Completed</span>
              </div>
              <span className="text-sm font-semibold text-green-600">{completedAppointments}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <ApperIcon name="XCircle" size={20} className="text-red-600" />
                <span className="font-medium text-gray-900">Cancelled</span>
              </div>
              <span className="text-sm font-semibold text-red-600">{cancelledAppointments}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <ApperIcon name="Clock" size={20} className="text-blue-600" />
                <span className="font-medium text-gray-900">Success Rate</span>
              </div>
              <span className="text-sm font-semibold text-blue-600">
                {Math.round((completedAppointments / data.appointments.length) * 100)}%
              </span>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Generate Reports</h2>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              icon="FileText"
            >
              Patient Demographics Report
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              icon="Calendar"
            >
              Appointment Summary Report
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              icon="Activity"
            >
              Medical Records Analysis
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              icon="DollarSign"
            >
              Revenue Report
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reports;