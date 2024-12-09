import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FareCalculatorService } from '../../services/fare-calculator.service';

@Component({
  selector: 'app-fare-calculator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  template: `
    <mat-card class="calculator-card">
      <mat-card-header>
        <mat-card-title>Fare Calculator</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form #calculatorForm="ngForm" (ngSubmit)="calculateFare()" novalidate>
          <div class="form-field">
            <mat-form-field appearance="fill">
              <mat-label>Distance (KM)</mat-label>
              <input
                matInput
                type="number"
                step="0.1"
                min="0"
                [(ngModel)]="distance"
                name="distance"
                #distanceField="ngModel"
                required>
              <mat-error *ngIf="distanceField.invalid && (distanceField.dirty || distanceField.touched)">
                Distance is required and must be greater than 0
              </mat-error>
            </mat-form-field>
          </div>

          <div class="form-field">
            <mat-checkbox
              [(ngModel)]="isNightFare"
              name="isNightFare">
              Night Fare (12:00 AM - 5:00 AM)
            </mat-checkbox>
          </div>

          <div class="form-field">
            <mat-checkbox
              [(ngModel)]="hasLuggage"
              name="hasLuggage">
              Large Luggage (>60x40 cm)
            </mat-checkbox>
          </div>

          <button
            mat-raised-button
            color="primary"
            type="submit"
            [disabled]="!calculatorForm.form.valid || !calculatorForm.form.dirty">
            Calculate Fare
          </button>
        </form>

        <div class="fare-result" *ngIf="calculatedFare !== null">
          <h3>Calculated Fare</h3>
          <p class="fare-amount">₹ {{calculatedFare}}</p>
          <div class="fare-breakdown">
            <small *ngIf="hasLuggage">Includes ₹6 luggage charge</small>
            <small *ngIf="isNightFare">Includes 25% night fare</small>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .calculator-card {
      margin: 20px 0;
    }
    .form-field {
      margin-bottom: 16px;
      width: 100%;
    }
    mat-form-field {
      width: 100%;
    }
    .fare-result {
      margin-top: 24px;
      text-align: center;
      padding: 16px;
      background-color: #f5f5f5;
      border-radius: 4px;
    }
    .fare-amount {
      font-size: 24px;
      font-weight: bold;
      color: #1976d2;
      margin: 8px 0;
    }
    .fare-breakdown {
      display: flex;
      flex-direction: column;
      gap: 4px;
      color: #666;
    }
  `]
})
export class FareCalculatorComponent {
  distance: number = 0;
  isNightFare: boolean = false;
  hasLuggage: boolean = false;
  calculatedFare: number | null = null;

  constructor(private fareCalculatorService: FareCalculatorService) {}

  calculateFare() {
    if (this.distance >= 0) {
      this.calculatedFare = this.fareCalculatorService.calculateFare(
        this.distance,
        this.isNightFare,
        this.hasLuggage
      );
    }
  }
}