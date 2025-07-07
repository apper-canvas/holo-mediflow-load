class RecordService {
  constructor() {
    this.tableName = 'record';
  }

  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "patient_name" } },
          { field: { Name: "date" } },
          { field: { Name: "diagnosis" } },
          { field: { Name: "symptoms" } },
          { field: { Name: "treatment" } },
          { field: { Name: "notes" } },
          { field: { Name: "blood_pressure" } },
          { field: { Name: "heart_rate" } },
          { field: { Name: "temperature" } },
          { field: { Name: "weight" } },
          { field: { name: "patient_id" }, referenceField: { field: { Name: "Name" } } },
          { field: { name: "appointment_id" }, referenceField: { field: { Name: "Name" } } }
        ]
      };

      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      // Transform database response to match UI expectations
      const transformedData = (response.data || []).map(record => ({
        ...record,
        symptoms: record.symptoms ? record.symptoms.split(',') : [],
        vitals: {
          bloodPressure: record.blood_pressure,
          heartRate: record.heart_rate,
          temperature: record.temperature,
          weight: record.weight
        }
      }));

      return transformedData;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching records:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "patient_name" } },
          { field: { Name: "date" } },
          { field: { Name: "diagnosis" } },
          { field: { Name: "symptoms" } },
          { field: { Name: "treatment" } },
          { field: { Name: "notes" } },
          { field: { Name: "blood_pressure" } },
          { field: { Name: "heart_rate" } },
          { field: { Name: "temperature" } },
          { field: { Name: "weight" } },
          { field: { name: "patient_id" }, referenceField: { field: { Name: "Name" } } },
          { field: { name: "appointment_id" }, referenceField: { field: { Name: "Name" } } }
        ]
      };

      const response = await apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response || !response.data) {
        return null;
      }

      // Transform database response to match UI expectations
      const record = response.data;
      return {
        ...record,
        symptoms: record.symptoms ? record.symptoms.split(',') : [],
        vitals: {
          bloodPressure: record.blood_pressure,
          heartRate: record.heart_rate,
          temperature: record.temperature,
          weight: record.weight
        }
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching record with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  async create(recordData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: `${recordData.patientName || recordData.patient_name} - ${recordData.date}`,
          patient_name: recordData.patientName || recordData.patient_name,
          date: recordData.date,
          diagnosis: recordData.diagnosis,
          symptoms: Array.isArray(recordData.symptoms) ? recordData.symptoms.join(',') : recordData.symptoms,
          treatment: recordData.treatment,
          notes: recordData.notes,
          blood_pressure: recordData.vitals?.bloodPressure || recordData.blood_pressure,
          heart_rate: recordData.vitals?.heartRate || recordData.heart_rate,
          temperature: recordData.vitals?.temperature || recordData.temperature,
          weight: recordData.vitals?.weight || recordData.weight,
          patient_id: parseInt(recordData.patientId || recordData.patient_id),
          appointment_id: parseInt(recordData.appointmentId || recordData.appointment_id)
        }]
      };

      const response = await apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating record:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }

  async update(id, recordData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Id: parseInt(id),
          Name: `${recordData.patientName || recordData.patient_name} - ${recordData.date}`,
          patient_name: recordData.patientName || recordData.patient_name,
          date: recordData.date,
          diagnosis: recordData.diagnosis,
          symptoms: Array.isArray(recordData.symptoms) ? recordData.symptoms.join(',') : recordData.symptoms,
          treatment: recordData.treatment,
          notes: recordData.notes,
          blood_pressure: recordData.vitals?.bloodPressure || recordData.blood_pressure,
          heart_rate: recordData.vitals?.heartRate || recordData.heart_rate,
          temperature: recordData.vitals?.temperature || recordData.temperature,
          weight: recordData.vitals?.weight || recordData.weight,
          patient_id: parseInt(recordData.patientId || recordData.patient_id),
          appointment_id: parseInt(recordData.appointmentId || recordData.appointment_id)
        }]
      };

      const response = await apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating record:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
        }
        
        return successfulDeletions.length > 0;
      }

      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting record:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
}

export const recordService = new RecordService();