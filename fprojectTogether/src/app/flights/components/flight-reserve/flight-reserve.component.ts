import { Component, OnInit } from '@angular/core';
import {Flight} from '../../model/flight';
import {ActivatedRoute, Router} from '@angular/router';
import {FlightService} from '../../service/flight.service';
import * as $ from 'jquery';
import {Seat} from '../../model/seat';
import {Reservationf} from '../../model/reservationf';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Continent} from '../../../continents/model/continent';
import {IDropdownSettings} from 'ng-multiselect-dropdown';





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
  closeResult = '';
  totalCost = 0;
  luggage = ['hand baggage (*max 10 kg)', 'medium luggage (*max 20 kg)', 'heavy luggage (*max 32 kg)'];
  selectedLuggage: string[] = [];
  dropdownSettings: IDropdownSettings = {};
  constructor(private router: Router,
              private flightService: FlightService,
              private route: ActivatedRoute,
              private modalService: NgbModal) { }

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
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  // tslint:disable-next-line:typedef
  addLuggage(res: Reservationf) {
    for (const a of this.selectedLuggage) {
      if (a === 'hand baggage (*max 10 kg)') {
        res.luggage.push('HB');
      }
      if (a === 'medium luggage (*max 20 kg)') {
        res.luggage.push('ML');
      }
      if (a === 'heavy luggage (*max 32 kg)') {
        res.luggage.push('HL');
      }
    }
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


  addReservation(res: Reservationf): void{
    if (!this.ifResExist(res)){
      this.resList.push(res);
      this.totalCost = this.flight.seatPrice * this.resList.length;
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
  onSubmit(content){
    for (const res of this.resList){
      const seat: Seat = res.seat;
      seat.reservation = null;
      res.seat = seat;
      this.addLuggage(res);
      this.flightService.saveR(res, this.id).subscribe();
    }
    setTimeout(() =>
      {
        this.flightService.updateVacancies(this.id, this.resList.length).subscribe(result => {
          this.router.navigate(['/paymentMessage']);
        });
      },
      2000);
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  // tslint:disable-next-line:typedef
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

