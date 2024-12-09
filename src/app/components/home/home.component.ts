import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="home-container">
      <h1>Welcome</h1>
      <mat-card>
        <mat-card-content>
          <p>Welcome to the application dashboard.</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 20px;
    }
  `]
})
export class HomeComponent {}