import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  private currentTime$ = new BehaviorSubject<Date>(new Date());

  constructor() {
    interval(1000).subscribe(() => {
      this.currentTime$.next(new Date());
    });
  }

  isNightTime(): Observable<boolean> {
    return this.currentTime$.pipe(
      map(date => {
        const hours = date.getHours();
        return hours >= 0 && hours < 5;
      })
    );
  }

  getCurrentTime(): Observable<Date> {
    return this.currentTime$.asObservable();
  }
}