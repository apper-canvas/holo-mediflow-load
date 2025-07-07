import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import SearchBar from '@/components/molecules/SearchBar';
import PatientList from '@/components/organisms/PatientList';
import PatientForm from '@/components/organisms/PatientForm';
import ApperIcon from '@/components/ApperIcon';

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddPatient = () => {
    setSelectedPatient(null);
    setShowForm(true);
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setShowForm(true);
  };

  const handleSavePatient = () => {
    setShowForm(false);
    setSelectedPatient(null);
    setRefreshKey(prev => prev + 1);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setSelectedPatient(null);
  };

  if (showForm) {
    return (
      <PatientForm
        patient={selectedPatient}
        onSave={handleSavePatient}
        onCancel={handleCancelForm}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-600">Manage your patient records and information</p>
        </div>
        <Button
          onClick={handleAddPatient}
          icon="UserPlus"
          className="bg-gradient-to-r from-primary to-secondary"
        >
          Add New Patient
        </Button>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <SearchBar
          onSearch={setSearchTerm}
          placeholder="Search patients by name, phone, or email..."
          showButton={false}
        />
      </motion.div>

      {/* Patient List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <PatientList
          key={refreshKey}
          searchTerm={searchTerm}
          onSelectPatient={handleEditPatient}
          onAddPatient={handleAddPatient}
        />
      </motion.div>
    </div>
  );
};

export default Patients;