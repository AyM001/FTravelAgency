import {Time} from '@angular/common';
import {Airport} from '../../airports/model/airport';


export class Flight {
  id: number;
  name: string;
  vacancies: number;
  departureDay: Date;
  returnDay: Date;
  departureHour: Time;
  returnHour: Time;
  airportModel: Airport;
}
