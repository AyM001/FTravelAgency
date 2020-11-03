import { Component, OnInit } from '@angular/core';
import {RoomType} from '../../model/room-type';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomTypeService} from '../../services/room-type.service';

@Component({
  selector: 'app-roomtype-add',
  templateUrl: './roomtype-add.component.html',
  styleUrls: ['./roomtype-add.component.css']
})
export class RoomtypeAddComponent implements OnInit {
roomType: RoomType = new RoomType();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private roomTypeService: RoomTypeService) { }

  ngOnInit(): void {
  }
// tslint:disable-next-line:typedef
  getRoomTypeList() {
    this.router.navigate(['roomType']);
  }
  // tslint:disable-next-line:typedef
  onSubmit(){
    this.roomTypeService.save(this.roomType).subscribe(result => this.getRoomTypeList());
  }
}
