import patientsData from '@/services/mockData/patients.json';

class PatientService {
  constructor() {
    this.patients = [...patientsData];
  }

  async getAll() {
    await this.delay();
    return [...this.patients];
  }

  async getById(id) {
    await this.delay();
    return this.patients.find(patient => patient.Id === parseInt(id));
  }

  async create(patientData) {
    await this.delay();
    const newPatient = {
      ...patientData,
      Id: Math.max(...this.patients.map(p => p.Id)) + 1
    };
    this.patients.push(newPatient);
    return newPatient;
  }

  async update(id, patientData) {
    await this.delay();
    const index = this.patients.findIndex(patient => patient.Id === parseInt(id));
    if (index !== -1) {
      this.patients[index] = { ...this.patients[index], ...patientData };
      return this.patients[index];
    }
    throw new Error('Patient not found');
  }

  async delete(id) {
    await this.delay();
    const index = this.patients.findIndex(patient => patient.Id === parseInt(id));
    if (index !== -1) {
      return this.patients.splice(index, 1)[0];
    }
    throw new Error('Patient not found');
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, 300));
  }
}

export const patientService = new PatientService();