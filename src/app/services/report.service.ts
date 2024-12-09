import { Injectable } from '@angular/core';

export interface IncorrectMeterReport {
  date: string;
  plateNumber: string;
  fromLocation: string;
  toLocation: string;
  distance: number;
  fareShown: number;
  difference: number;
  redDotSeen: boolean;
  inTime: string;
  outTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  submitIncorrectMeterReport(report: IncorrectMeterReport) {
    console.log('Incorrect Meter Report:', report);
  }
}