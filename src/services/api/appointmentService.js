import appointmentsData from '@/services/mockData/appointments.json';

class AppointmentService {
  constructor() {
    this.appointments = [...appointmentsData];
  }

  async getAll() {
    await this.delay();
    return [...this.appointments];
  }

  async getById(id) {
    await this.delay();
    return this.appointments.find(appointment => appointment.Id === parseInt(id));
  }

  async create(appointmentData) {
    await this.delay();
    const newAppointment = {
      ...appointmentData,
      Id: Math.max(...this.appointments.map(a => a.Id)) + 1
    };
    this.appointments.push(newAppointment);
    return newAppointment;
  }

  async update(id, appointmentData) {
    await this.delay();
    const index = this.appointments.findIndex(appointment => appointment.Id === parseInt(id));
    if (index !== -1) {
      this.appointments[index] = { ...this.appointments[index], ...appointmentData };
      return this.appointments[index];
    }
    throw new Error('Appointment not found');
  }

  async delete(id) {
    await this.delay();
    const index = this.appointments.findIndex(appointment => appointment.Id === parseInt(id));
    if (index !== -1) {
      return this.appointments.splice(index, 1)[0];
    }
    throw new Error('Appointment not found');
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, 200));
  }
}

export const appointmentService = new AppointmentService();