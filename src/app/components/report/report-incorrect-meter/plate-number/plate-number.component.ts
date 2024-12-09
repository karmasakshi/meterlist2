import { Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-plate-number',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PlateNumberComponent),
      multi: true
    }
  ],
  template: `
    <div class="plate-number-container">
      <div class="prefix">MH</div>
      <mat-form-field appearance="fill" class="region">
        <mat-select [(ngModel)]="region" (ngModelChange)="updateValue()">
          <mat-option value="01">01</mat-option>
          <mat-option value="02">02</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="fill" class="number">
        <input matInput
               [(ngModel)]="number"
               (ngModelChange)="updateValue()"
               placeholder="XXXX"
               maxlength="4"
               pattern="[A-Z0-9]{4}">
      </mat-form-field>
    </div>
  `,
  styles: [`
    .plate-number-container {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .prefix {
      background: #f5f5f5;
      padding: 8px 12px;
      border-radius: 4px;
      font-weight: 500;
    }
    .region {
      width: 80px;
    }
    .number {
      width: 100px;
    }
  `]
})
export class PlateNumberComponent implements ControlValueAccessor {
  region: string = '01';
  number: string = '';
  
  private onChange: any = () => {};
  private onTouch: any = () => {};

  updateValue() {
    const fullPlateNumber = `MH-${this.region}-${this.number}`;
    this.onChange(fullPlateNumber);
    this.onTouch();
  }

  writeValue(value: string): void {
    if (value) {
      const parts = value.split('-');
      if (parts.length === 3) {
        this.region = parts[1];
        this.number = parts[2];
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}