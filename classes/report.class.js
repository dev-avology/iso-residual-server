import { v4 as uuid } from 'uuid';
export default class Report {
  constructor(organizationID, processor, type, month, reportData) {
    this.reportID = `report-${uuid().slice(-8)}`;
    console.log("Generated reportID:", this.reportID); // Add this log
    this.organizationID = organizationID;
    this.processor = processor;
    this.type = type;
    this.month = month;
    this.reportData = reportData;
    this.processors = [];
    this.approved = false;
  }

  updateReport(data) {
    for (let key in data) {
      if (this.hasOwnProperty(key)) {
        this[key] = data[key];
      }
    }
    this.updatedAt = new Date();
  }
}