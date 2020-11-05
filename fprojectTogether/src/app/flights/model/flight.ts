import {Time} from '@angular/common';
import {Airport} from '../../airports/model/airport';


export class Flight {
  id: number;
  name: string;
  vacancies: number;
  departureDay: string;
  returnDay: string;
  departureHour: string;
  arriveHour: string;
  rowsNumber: number;
  seatsRowNumber: number;
  airportDeparture: Airport;
  airportArrival: Airport;
}
