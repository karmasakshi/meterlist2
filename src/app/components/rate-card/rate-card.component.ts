import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { RateCardService } from './rate-card.service';
import { TimeService } from '../../services/time.service';
import { FareManagementService } from '../../services/fare-management.service';
import { RateCard, FareNote } from './rate-card.interface';
import { Subscription } from 'rxjs';
import { FareCalculatorComponent } from '../fare-calculator/fare-calculator.component';

@Component({
  selector: 'app-rate-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatSlideToggleModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    FareCalculatorComponent
  ],
  template: `
    <div class="rate-card-container">
      <div class="header-section">
        <h2>Rate Card</h2>
        <a href="https://transport.maharashtra.gov.in/Site/Upload/GR/Auto%20English%201.pdf" 
           target="_blank" 
           class="official-doc-link"
           mat-button 
           color="primary">
          <mat-icon>description</mat-icon>
          Official Document
        </a>
      </div>

      <app-fare-calculator></app-fare-calculator>

      <div class="fare-controls">
        <div class="fare-toggle">
          <mat-slide-toggle
            [checked]="isNightFare"
            (change)="toggleFareType()"
            color="primary">
            Night Fare (12 AM - 5 AM)
          </mat-slide-toggle>
          <span class="current-time">Current Time: {{currentTime | date:'HH:mm:ss'}}</span>
        </div>
      </div>
      
      <mat-card>
        <mat-card-content>
          <table mat-table [dataSource]="rates" class="rate-table">
            <ng-container matColumnDef="distance">
              <th mat-header-cell *matHeaderCellDef>Digital Meter (KM)</th>
              <td mat-cell *matCellDef="let rate">{{rate.distance | number:'1.2-2'}}</td>
            </ng-container>

            <ng-container matColumnDef="fare">
              <th mat-header-cell *matHeaderCellDef>
                {{isNightFare ? 'Night Fare' : 'Regular Fare'}}
              </th>
              <td mat-cell *matCellDef="let rate">
                Rs. {{isNightFare ? rate.midnightFare : rate.regularFare}}
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </mat-card-content>
      </mat-card>

      <mat-card class="notes-card">
        <mat-card-content>
          <h3>Important Notes:</h3>
          <mat-list>
            <mat-list-item *ngFor="let note of notes">
              • {{note.text}}
            </mat-list-item>
          </mat-list>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .rate-card-container {
      padding: 20px;
    }
    .header-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .official-doc-link {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .fare-controls {
      margin-bottom: 20px;
    }
    .fare-toggle {
      display: flex;
      align-items: center;
      gap: 20px;
      background: #f5f5f5;
      padding: 12px;
      border-radius: 8px;
    }
    .current-time {
      color: #666;
      font-size: 0.9em;
      font-weight: 500;
    }
    .rate-table {
      width: 100%;
    }
    th.mat-header-cell,
    td.mat-cell {
      padding: 12px;
      text-align: center;
    }
    .notes-card {
      margin-top: 20px;
    }
    .mat-mdc-list-item {
      height: auto !important;
      margin-bottom: 8px;
    }
  `]
})
export class RateCardComponent implements OnInit, OnDestroy {
  rates: RateCard[] = [];
  notes: FareNote[] = [];
  displayedColumns: string[] = ['distance', 'fare'];
  isNightFare = false;
  currentTime = new Date();
  private subscriptions: Subscription[] = [];

  constructor(
    private rateCardService: RateCardService,
    private timeService: TimeService,
    private fareManagementService: FareManagementService
  ) {
    this.rates = this.rateCardService.getRates();
    this.notes = this.rateCardService.getNotes();
  }

  ngOnInit() {
    this.subscriptions.push(
      this.timeService.getCurrentTime().subscribe(time => {
        this.currentTime = time;
      }),
      this.fareManagementService.getIsNightFare().subscribe(isNight => {
        this.isNightFare = isNight;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  toggleFareType() {
    this.fareManagementService.toggleFareType();
  }
}