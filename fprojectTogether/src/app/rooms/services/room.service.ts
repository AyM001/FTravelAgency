import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {Room} from '../model/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private roomUrl: string;

  constructor(private http: HttpClient) {
    this.roomUrl = 'http://localhost:8080/room';
  }

  public findAll(): Observable<Room[]> {
    return this.http.get<[Room]>(this.roomUrl);
  }

  // tslint:disable-next-line:typedef
  public save(room: Room) {
    return this.http.post<Room>(this.roomUrl, room);
  }

  // tslint:disable-next-line:typedef
  public update(room: Room) {
    return this.http.put<Room>(this.roomUrl, room);
  }

  public getById(id: number): Observable<any> {
    return this.http.get(`${this.roomUrl}/${id}`);
  }

  // tslint:disable-next-line:typedef
  public delete(id: number) {
    return this.http.delete(`${this.roomUrl}/${id}`);
  }
}
