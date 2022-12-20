import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Station } from '../model/Station.model';

const url = 'http://localhost:8080/station';

@Injectable({
  providedIn: 'root',
})
export class StationService {
  constructor(private http: HttpClient) {}
  createStation(station: Station): Observable<Station> {
    return this.http.post<Station>(url + '/create', station);
  }
  getAllStations(): Observable<Station[]> {
    return this.http.get<Station[]>(url + '/getall');
  }
  getStationById(id: any): Observable<Station> {
    return this.http.get<Station>(url + '/get/' + id);
  }
  deleteStationById(id: number): Observable<Station> {
    return this.http.delete<Station>(url + '/delete/' + id);
  }
  deleteAllStations(): Observable<Station> {
    return this.http.delete<Station>(url + '/deleteall');
  }
  updateStationById(id: number, station: Station): Observable<Station> {
    return this.http.put<Station>(url + '/update/' + id, station);
  }
}
