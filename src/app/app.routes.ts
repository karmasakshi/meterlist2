import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { ReportComponent } from './components/report/report.component';
import { ReportCorrectMeterComponent } from './components/report/report-correct-meter/report-correct-meter.component';
import { ReportIncorrectMeterComponent } from './components/report/report-incorrect-meter/report-incorrect-meter.component';
import { RateCardComponent } from './components/rate-card/rate-card.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchComponent },
  { 
    path: 'report',
    children: [
      { path: '', component: ReportComponent },
      { path: 'correct', component: ReportCorrectMeterComponent },
      { path: 'incorrect', component: ReportIncorrectMeterComponent }
    ]
  },
  { path: 'rate-card', component: RateCardComponent },
  { path: '**', redirectTo: '' }
];