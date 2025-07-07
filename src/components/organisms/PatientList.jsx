import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import StatusBadge from '@/components/molecules/StatusBadge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { patientService } from '@/services/api/patientService';
import { format } from 'date-fns';

const PatientList = ({ onSelectPatient, onAddPatient, searchTerm = '' }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await patientService.getAll();
      setPatients(data);
    } catch (err) {
      setError('Failed to load patients. Please try again.');
    } finally {
      setLoading(false);
    }
  };

const filteredPatients = patients.filter(patient =>
    patient.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading type="card" rows={5} />;
  if (error) return <Error message={error} onRetry={loadPatients} />;
  if (filteredPatients.length === 0) {
    return (
      <Empty
        title="No patients found"
        message={searchTerm ? "No patients match your search criteria" : "Start by adding your first patient"}
        icon="Users"
        action={onAddPatient}
        actionLabel="Add Patient"
      />
    );
  }

  return (
    <div className="space-y-4">
      {filteredPatients.map((patient, index) => (
        <motion.div
          key={patient.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card hover className="p-6" onClick={() => onSelectPatient(patient)}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                  <ApperIcon name="User" size={24} className="text-white" />
                </div>
                <div>
<h3 className="font-semibold text-gray-900">
                    {patient.first_name} {patient.last_name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    DOB: {format(new Date(patient.date_of_birth), 'MMM dd, yyyy')}
                  </p>
                  <p className="text-sm text-gray-600">
                    {patient.phone} • {patient.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
<p className="text-sm font-medium text-gray-900">
                    {patient.blood_type}
                  </p>
                  <p className="text-sm text-gray-600">
                    {patient.gender}
                  </p>
                </div>
                <StatusBadge status="Active" />
                <Button
                  variant="outline"
                  size="sm"
                  icon="ArrowRight"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPatient(patient);
                  }}
                />
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default PatientList;