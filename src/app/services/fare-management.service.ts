import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TimeService } from './time.service';

@Injectable({
  providedIn: 'root'
})
export class FareManagementService {
  private isNightFareSubject = new BehaviorSubject<boolean>(false);
  private autoToggleEnabledSubject = new BehaviorSubject<boolean>(true);

  constructor(private timeService: TimeService) {
    this.initializeNightFareMode();
  }

  private initializeNightFareMode(): void {
    this.timeService.isNightTime().subscribe(isNight => {
      if (this.autoToggleEnabledSubject.value) {
        this.isNightFareSubject.next(isNight);
      }
    });
  }

  toggleFareType(): void {
    this.autoToggleEnabledSubject.next(false);
    this.isNightFareSubject.next(!this.isNightFareSubject.value);
  }

  getIsNightFare(): Observable<boolean> {
    return this.isNightFareSubject.asObservable();
  }

  getAutoToggleEnabled(): Observable<boolean> {
    return this.autoToggleEnabledSubject.asObservable();
  }
}