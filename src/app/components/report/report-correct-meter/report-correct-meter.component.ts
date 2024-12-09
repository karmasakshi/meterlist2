import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report-correct-meter',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule
  ],
  template: `
    <div class="report-container">
      <h2>Report Correct Meter Reading</h2>
      <mat-card>
        <mat-card-content>
          <form class="report-form">
            <mat-form-field appearance="fill">
              <mat-label>Auto Number</mat-label>
              <input matInput placeholder="MH-XX-XXXX" required>
            </mat-form-field>

            <mat-form-field appearance="fill">
              <mat-label>Distance Traveled (KM)</mat-label>
              <input matInput type="number" step="0.1" min="0" required>
            </mat-form-field>

            <mat-form-field appearance="fill">
              <mat-label>Fare Amount</mat-label>
              <input matInput type="number" min="0" required>
              <mat-hint>Enter the amount shown on the meter</mat-hint>
            </mat-form-field>

            <mat-form-field appearance="fill">
              <mat-label>Journey Type</mat-label>
              <mat-select required>
                <mat-option value="regular">Regular Fare</mat-option>
                <mat-option value="night">Night Fare</mat-option>
              </mat-select>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit">
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
    button[type="submit"] {
      margin-top: 16px;
    }
  `]
})
export class ReportCorrectMeterComponent {}