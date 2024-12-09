import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  template: `
    <div class="report-container">
      <h2>Report Auto Meter</h2>
      <div class="report-options">
        <mat-card class="report-card" routerLink="correct">
          <mat-card-content>
            <mat-icon class="report-icon">check_circle</mat-icon>
            <h3>Report Correct Meter</h3>
            <p>Help us maintain data about properly functioning auto meters</p>
          </mat-card-content>
        </mat-card>

        <mat-card class="report-card" routerLink="incorrect">
          <mat-card-content>
            <mat-icon class="report-icon warning">warning</mat-icon>
            <h3>Report Incorrect Meter</h3>
            <p>Report an auto rickshaw with an incorrect or tampered meter</p>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .report-container {
      padding: 20px;
    }
    .report-options {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .report-card {
      cursor: pointer;
      transition: transform 0.2s;
      text-align: center;
      padding: 20px;
    }
    .report-card:hover {
      transform: translateY(-5px);
    }
    .report-icon {
      font-size: 48px;
      height: 48px;
      width: 48px;
      margin-bottom: 16px;
      color: #4CAF50;
    }
    .report-icon.warning {
      color: #f44336;
    }
    h3 {
      margin: 0 0 8px 0;
      font-size: 1.5em;
    }
    p {
      margin: 0;
      color: #666;
    }
  `]
})
export class ReportComponent {}