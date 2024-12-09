import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FareCalculatorService {
  private readonly MINIMUM_FARE = 23;
  private readonly PER_KM_RATE = 15.33;
  private readonly NIGHT_FARE_MULTIPLIER = 1.25;
  private readonly LUGGAGE_CHARGE = 6;

  calculateFare(distance: number, isNightFare: boolean, hasLuggage: boolean): number {
    let fare: number;
    
    if (distance <= 1.5) {
      fare = this.MINIMUM_FARE;
    } else {
      fare = this.MINIMUM_FARE + (distance - 1.5) * this.PER_KM_RATE;
    }

    // Round to nearest rupee (0.5 and above rounds up, below 0.5 rounds down)
    fare = Math.round(fare);

    if (isNightFare) {
      fare = Math.round(fare * this.NIGHT_FARE_MULTIPLIER);
    }

    if (hasLuggage) {
      fare += this.LUGGAGE_CHARGE;
    }

    return fare;
  }
}