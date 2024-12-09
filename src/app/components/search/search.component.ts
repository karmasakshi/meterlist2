import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div class="search-container">
      <h2>Search</h2>
      <mat-form-field appearance="fill">
        <mat-label>Search term</mat-label>
        <input matInput placeholder="Enter search term">
      </mat-form-field>
      <button mat-raised-button color="primary">Search</button>
    </div>
  `,
  styles: [`
    .search-container {
      padding: 20px;
    }
  `]
})
export class SearchComponent {}