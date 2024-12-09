import { Injectable } from '@angular/core';
import { RateCard, FareNote } from './rate-card.interface';
import { fareData, fareNotes } from '../../data/fare-data';

@Injectable({
  providedIn: 'root'
})
export class RateCardService {
  getRates(): RateCard[] {
    return fareData;
  }

  getNotes(): FareNote[] {
    return fareNotes;
  }
}