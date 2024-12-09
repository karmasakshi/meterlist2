import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ReportService, IncorrectMeterReport } from '../../../services/report.service';
import { PlateNumberComponent } from './plate-number/plate-number.component';
import { FareDifferenceComponent } from './fare-difference/fare-difference.component';

@Component({
  selector: 'app-report-incorrect-meter',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    PlateNumberComponent,
    FareDifferenceComponent
  ],
  template: `
    <div class="report-container">
      <h2>Report Incorrect Meter</h2>
      <mat-card>
        <mat-card-content>
          <form class="report-form" #reportForm="ngForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="fill">
              <mat-label>Date</mat-label>
              <input matInput [ngModel]="report.date" name="date" required>
            </mat-form-field>

            <app-plate-number
              [(ngModel)]="report.plateNumber"
              name="plateNumber"
              required>
            </app-plate-number>

            <mat-form-field appearance="fill">
              <mat-label>From Location</mat-label>
              <input matInput [(ngModel)]="report.fromLocation" 
                     name="fromLocation" required>
            </mat-form-field>

            <mat-form-field appearance="fill">
              <mat-label>To Location</mat-label>
              <input matInput [(ngModel)]="report.toLocation" 
                     name="toLocation" required>
            </mat-form-field>

            <mat-form-field appearance="fill">
              <mat-label>Distance (KM)</mat-label>
              <input matInput type="number" [(ngModel)]="report.distance" 
                     name="distance" step="0.1" min="0" required>
            </mat-form-field>

            <mat-form-field appearance="fill">
              <mat-label>Fare Shown</mat-label>
              <input matInput type="number" [(ngModel)]="report.fareShown" 
                     name="fareShown" min="0" required>
            </mat-form-field>

            <app-fare-difference
              [distance]="report.distance"
              [fareShown]="report.fareShown"
              [isNightTime]="isNightTime()">
            </app-fare-difference>

            <div class="checkbox-field">
              <mat-checkbox [(ngModel)]="report.redDotSeen" name="redDotSeen">
                Red dot seen on meter?
              </mat-checkbox>
            </div>

            <mat-form-field appearance="fill">
              <mat-label>In Time</mat-label>
              <input matInput type="time" [(ngModel)]="report.inTime" 
                     name="inTime" required>
            </mat-form-field>

            <mat-form-field appearance="fill">
              <mat-label>Out Time</mat-label>
              <input matInput type="time" [(ngModel)]="report.outTime" 
                     name="outTime" required>
            </mat-form-field>

            <button mat-raised-button color="warn" type="submit" 
                    [disabled]="!reportForm.form.valid">
              Submit Report
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .report-container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    .report-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    mat-card {
      margin-top: 20px;
    }
    .checkbox-field {
      margin: 8px 0;
    }
    button[type="submit"] {
      margin-top: 16px;
    }
  `]
})
export class ReportIncorrectMeterComponent implements OnInit {
  report: IncorrectMeterReport = {
    date: new Date().toISOString().split('T')[0],
    plateNumber: '',
    fromLocation: '',
    toLocation: '',
    distance: 0,
    fareShown: 0,
    difference: 0,
    redDotSeen: false,
    inTime: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
    outTime: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
  };

  constructor(private reportService: ReportService) {}

  ngOnInit() {}

  isNightTime(): boolean {
    const hour = new Date().getHours();
    return hour >= 0 && hour < 5;
  }

  onSubmit() {
    this.reportService.submitIncorrectMeterReport(this.report);
  }
}