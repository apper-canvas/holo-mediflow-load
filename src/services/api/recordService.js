import recordsData from '@/services/mockData/records.json';

class RecordService {
  constructor() {
    this.records = [...recordsData];
  }

  async getAll() {
    await this.delay();
    return [...this.records];
  }

  async getById(id) {
    await this.delay();
    return this.records.find(record => record.Id === parseInt(id));
  }

  async create(recordData) {
    await this.delay();
    const newRecord = {
      ...recordData,
      Id: Math.max(...this.records.map(r => r.Id)) + 1
    };
    this.records.push(newRecord);
    return newRecord;
  }

  async update(id, recordData) {
    await this.delay();
    const index = this.records.findIndex(record => record.Id === parseInt(id));
    if (index !== -1) {
      this.records[index] = { ...this.records[index], ...recordData };
      return this.records[index];
    }
    throw new Error('Record not found');
  }

  async delete(id) {
    await this.delay();
    const index = this.records.findIndex(record => record.Id === parseInt(id));
    if (index !== -1) {
      return this.records.splice(index, 1)[0];
    }
    throw new Error('Record not found');
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, 250));
  }
}

export const recordService = new RecordService();