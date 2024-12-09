import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { FareCalculatorService } from '../../../../services/fare-calculator.service';

@Component({
  selector: 'app-fare-difference',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  template: `
    <mat-form-field appearance="fill" class="full-width">
      <mat-label>Fare Difference</mat-label>
      <input matInput
             [value]="difference"
             readonly>
      <mat-hint>Calculated automatically based on correct fare</mat-hint>
    </mat-form-field>
  `,
  styles: [`
    .full-width {
      width: 100%;
    }
  `]
})
export class FareDifferenceComponent implements OnChanges {
  @Input() distance: number = 0;
  @Input() fareShown: number = 0;
  @Input() isNightTime: boolean = false;
  
  difference: number = 0;

  constructor(private fareCalculatorService: FareCalculatorService) {}

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['distance'] || changes['fareShown'] || changes['isNightTime']) 
        && this.distance && this.fareShown) {
      this.calculateDifference();
    }
  }

  private calculateDifference() {
    const correctFare = this.fareCalculatorService.calculateFare(
      this.distance,
      this.isNightTime,
      false
    );
    this.difference = this.fareShown - correctFare;
  }
}