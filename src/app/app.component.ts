import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SupabaseService } from './services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav mode="side" opened class="sidenav">
        <mat-nav-list>
          <a mat-list-item routerLink="/" routerLinkActive="active">
            <mat-icon>home</mat-icon>
            <span class="nav-label">Home</span>
          </a>
          <a mat-list-item routerLink="/search" routerLinkActive="active">
            <mat-icon>search</mat-icon>
            <span class="nav-label">Search</span>
          </a>
          <a mat-list-item routerLink="/report" routerLinkActive="active">
            <mat-icon>assessment</mat-icon>
            <span class="nav-label">Report</span>
          </a>
          <a mat-list-item routerLink="/rate-card" routerLinkActive="active">
            <mat-icon>calculate</mat-icon>
            <span class="nav-label">Fare Calculator</span>
          </a>
          <ng-container *ngIf="supabaseService.isAuthenticated$ | async; else loginLink">
            <a mat-list-item (click)="logout()">
              <mat-icon>logout</mat-icon>
              <span class="nav-label">Logout</span>
            </a>
          </ng-container>
          <ng-template #loginLink>
            <a mat-list-item routerLink="/login" routerLinkActive="active">
              <mat-icon>login</mat-icon>
              <span class="nav-label">Login</span>
            </a>
          </ng-template>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button mat-icon-button (click)="sidenav.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
          <span>My Application</span>
        </mat-toolbar>
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100vh;
    }
    .sidenav {
      width: 250px;
    }
    .content {
      padding: 20px;
    }
    .active {
      background-color: rgba(0, 0, 0, 0.1);
    }
    .mat-list-item {
      gap: 16px;
    }
    .nav-label {
      margin-left: 8px;
    }
  `]
})
export class AppComponent {
  constructor(
    public supabaseService: SupabaseService,
    private router: Router
  ) {}

  async logout() {
    await this.supabaseService.signOut();
    this.router.navigate(['/login']);
  }
}