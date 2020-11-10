import { Component, OnInit } from '@angular/core';
import {Flight} from '../../model/flight';
import {ActivatedRoute, Router} from '@angular/router';
import {FlightService} from '../../service/flight.service';
import * as $ from 'jquery';
import {Seat} from '../../model/seat';





@Component({
  selector: 'app-flight-reserve',
  templateUrl: './flight-reserve.component.html',
  styleUrls: ['./flight-reserve.component.css']
})
export class FlightReserveComponent implements OnInit {
  flight: Flight = new Flight();
  id: number;
  seatsL: Seat[] = [];
  seatsR: Seat[] = [];

  constructor(private router: Router,
              private flightService: FlightService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.flight = new Flight();
    this.id = this.route.snapshot.params.id;
    this.flightService.getById(this.id).subscribe(data => {
      this.flight = new Flight();
      this.flight = data;
    });
    this.flightService.getSeatsLeft(this.id).subscribe(data => {
      this.seatsL = [];
      this.seatsL = data;
    });
    this.flightService.getSeatsRight(this.id).subscribe(data => {
      this.seatsR = [];
      this.seatsR = data;
    });
}
// tslint:disable-next-line:typedef
hideSeat(){
  $('.cinema-seats .seat').on('click', function(): void {
    $(this).toggleClass('active');
  });
}
}
