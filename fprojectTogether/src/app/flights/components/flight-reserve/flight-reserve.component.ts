import { Component, OnInit } from '@angular/core';
import {Flight} from '../../model/flight';
import {ActivatedRoute, Router} from '@angular/router';
import {FlightService} from '../../service/flight.service';
import * as $ from 'jquery';
import {Seat} from '../../model/seat';
import {Reservationf} from '../../model/reservationf';





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
  numberOfSeatsStyle: number;
  firstName: string;
  lastName: string;
  documentId: string;
  resList: Reservationf[] = [];
  reservation: Reservationf = new Reservationf();

  constructor(private router: Router,
              private flightService: FlightService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.reservation = new Reservationf();
    this.resList = [];
    this.flight = new Flight();
    this.id = this.route.snapshot.params.id;
    this.flightService.getById(this.id).subscribe(data => {
      this.flight = new Flight();
      this.flight = data;
      this.numberOfSeatsStyle = (12 / this.flight.seatsRowNumber);
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
  hideSeatReserved(seat: Seat, event) {
    if (seat.reservation !== null) {
      if (seat.reservation.id !== undefined){
        console.log(seat.reservation.id);
        $(event).addClass('reserve');
      }
    }
  }
// tslint:disable-next-line:typedef
  hideSeat(seat: Seat, event){
      $('.seat').on('click', function(): void {
        $(this).toggleClass('active');
      });
      setTimeout(() => {
          const res: Reservationf = new Reservationf();
          if (this.ifSelected(event)) {
            res.date = this.flight.departureDay;
            res.seat = seat;
            seat.reservation = res;
            this.addReservation(res);
          } else if (!this.ifSelected(event)) {
            this.deleteReservation(seat.reservation);
            seat.reservation = null;
          }
        },
        3000);
  }



// tslint:disable-next-line:typedef
  ifSelected(event): boolean{
    if ( $(event).hasClass('active')){
      return true;
    }
  }
// tslint:disable-next-line:typedef
//   ifReserved(event): boolean{
//     if ( $(event).hasClass('reserve')){
//       return true;
//     }
//   }

  addReservation(res: Reservationf): void{
    if (!this.ifResExist(res)){
      this.resList.push(res);
    }
  }
  ifResExist(res: Reservationf): boolean{
    for (const rs of this.resList){
      if (rs.seat.id === res.seat.id) {
        return true;
      }
    }
    return false;
  }
  deleteReservation(res: Reservationf): void{
    for (let i = 0; i < this.resList.length; i++){
      if (this.resList[i].seat === res.seat){
        this.resList.splice(i, 1);
      }
    }
    this.resList.forEach( item => delete item.id );
  }
// tslint:disable-next-line:typedef
  onSubmit(){
    for (const res of this.resList){
      this.flightService.saveR(res).subscribe();
    }
    setTimeout(() =>
      {
        this.router.navigate(['']);
      },
      2000);
  }
}

