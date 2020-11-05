import { Component, OnInit } from '@angular/core';
import {Flight} from '../../model/flight';
import {FlightService} from '../../service/flight.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {City} from '../../../cities/model/city';
import {Airport} from '../../../airports/model/airport';
import {AirportService} from '../../../airports/service/airport.service';
import {Hotel} from '../../../hotels/model/hotel';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.css']
})
export class FlightFormComponent implements OnInit {

  flight: Flight;
  dropdownSettings: IDropdownSettings = {};
  airports: Airport[];
  selectedAirportsDep: Airport[];
  selectedAirportsArr: Airport[];
  constructor(private flightService: FlightService,
              private airportService: AirportService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.flight = new Flight();
    this.airports = [];
    this.selectedAirportsDep = [];
    this.selectedAirportsArr = [];
    this.airportService.findAll().subscribe(data => this.airports = data);
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }
  // tslint:disable-next-line:typedef
  onSubmit(){
    this.flight.airportDeparture = this.selectedAirportsDep[0];
    this.flight.airportArrival = this.selectedAirportsArr[0];
    this.flightService.save(this.flight).subscribe(result => this.goToFlightList());
  }

  // tslint:disable-next-line:typedef
  goToFlightList(){
    this.router.navigate(['/flights']);
  }
  // tslint:disable-next-line:typedef
  onItemSelect(item: any) {
    console.log(item);
  }

  // tslint:disable-next-line:typedef
  onSelectAll(items: any) {
    console.log(items);
  }

}
