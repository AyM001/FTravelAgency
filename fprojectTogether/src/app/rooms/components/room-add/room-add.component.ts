import {Component, OnInit} from '@angular/core';
import {Room} from '../../model/room';
import {ActivatedRoute, Router} from '@angular/router';

import {RoomService} from '../../services/room.service';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {RoomType} from '../../../roomTypes/model/room-type';
import {RoomTypeService} from '../../../roomTypes/services/room-type.service';

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.component.html',
  styleUrls: ['./room-add.component.css']
})
export class RoomAddComponent implements OnInit {
  room: Room = new Room();
  dropdownSettings: IDropdownSettings = {};
  roomtypes: RoomType[];
  selectedRoomtypes: RoomType[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private roomService: RoomService,
              private roomTypeService: RoomTypeService) {
  }

  ngOnInit(): void {
    this.roomtypes = [];
    this.roomTypeService.findAll().subscribe(data => this.roomtypes = data);
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

// tslint:disable-next-line:typedef
  getRoomList() {
    this.router.navigate(['room']);
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.room.roomTypeModel = this.selectedRoomtypes[0];
    this.roomService.save(this.room).subscribe(result => this.getRoomList());
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
