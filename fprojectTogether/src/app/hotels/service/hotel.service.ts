import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Hotel} from '../model/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private hotelsUrl: string;
  constructor(private http: HttpClient) {
    this.hotelsUrl = 'http://localhost:8080/hotels';
  }

  public findAll(): Observable<Hotel[]>{
    return this.http.get<Hotel[]>(this.hotelsUrl);
  }
  public getById(id: number): Observable<any>{
    return this.http.get(`${this.hotelsUrl}/${id}`);
  }

  // tslint:disable-next-line:typedef
  public save(hotel: Hotel){
  return this.http.post<Hotel>(this.hotelsUrl , hotel);
  }

  // tslint:disable-next-line:typedef
  public delete(id: number){
    return this.http.delete(`${this.hotelsUrl}/${id}`);
  }

  // tslint:disable-next-line:typedef
  public update(hotel: Hotel){
    return this.http.put<Hotel>(this.hotelsUrl , hotel);
  }
  getHotelphotos(id: number): Observable<any> {
    return this.http.get(`${this.hotelsUrl}/photos/${id}`);
  }
}
