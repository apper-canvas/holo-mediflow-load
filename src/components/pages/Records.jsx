import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import StatusBadge from '@/components/molecules/StatusBadge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { recordService } from '@/services/api/recordService';
import { format } from 'date-fns';

const Records = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await recordService.getAll();
      setRecords(data);
    } catch (err) {
      setError('Failed to load medical records. Please try again.');
    } finally {
      setLoading(false);
    }
  };

const filteredRecords = records.filter(record =>
    record.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.symptoms.some(symptom => symptom.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <Loading type="table" rows={8} />;
  if (error) return <Error message={error} onRetry={loadRecords} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
          <p className="text-gray-600">View and manage patient medical records</p>
        </div>
        <Button
          icon="FileText"
          className="bg-gradient-to-r from-primary to-secondary"
        >
          New Record
        </Button>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search records by patient name, diagnosis, or symptoms..."
          icon="Search"
          className="max-w-md"
        />
      </motion.div>

      {/* Records List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {filteredRecords.length === 0 ? (
          <Empty
            title="No medical records found"
            message={searchTerm ? "No records match your search criteria" : "Start by adding your first medical record"}
            icon="FileText"
            actionLabel="Add Record"
          />
        ) : (
          <div className="space-y-4">
            {filteredRecords.map((record, index) => (
              <motion.div
                key={record.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                          <ApperIcon name="User" size={16} className="text-white" />
                        </div>
                        <div>
<h3 className="font-semibold text-gray-900">{record.patient_name}</h3>
                          <p className="text-sm text-gray-600">
                            {format(new Date(record.date), 'MMM dd, yyyy')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Diagnosis</h4>
                          <p className="text-gray-700">{record.diagnosis}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Symptoms</h4>
                          <div className="flex flex-wrap gap-2">
                            {record.symptoms.map((symptom, idx) => (
                              <StatusBadge key={idx} status={symptom} />
                            ))}
                          </div>
                        </div>
                      </div>

                      {record.vitals && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">BP</p>
                            <p className="font-semibold">{record.vitals.bloodPressure}</p>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">HR</p>
                            <p className="font-semibold">{record.vitals.heartRate}</p>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Temp</p>
                            <p className="font-semibold">{record.vitals.temperature}°F</p>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Weight</p>
                            <p className="font-semibold">{record.vitals.weight} lbs</p>
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Treatment</h4>
                        <p className="text-gray-700">{record.treatment}</p>
                      </div>

                      {record.notes && (
                        <div className="mt-4">
                          <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                          <p className="text-gray-700">{record.notes}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        icon="Edit"
                        onClick={() => setSelectedRecord(record)}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        icon="ArrowRight"
                        onClick={() => setSelectedRecord(record)}
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Records;