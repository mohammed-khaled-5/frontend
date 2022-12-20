import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Trip } from "../model/Trip.model";

const url = "http://localhost:8080/trip";

@Injectable({
  providedIn: "root",
})
export class TripService {
  constructor(private http: HttpClient) {}
  createTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(url + "/create", trip);
  }
  getAllTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(url + "/getall");
  }
  getTripById(id: any): Observable<Trip> {
    return this.http.get<Trip>(url + "/get/" + id);
  }
  deleteTripById(id: number): Observable<Trip> {
    return this.http.delete<Trip>(url + "/delete/" + id);
  }
  deleteAllTrips(): Observable<Trip> {
    return this.http.delete<Trip>(url + "/deleteall");
  }
  updateTripById(id: number, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(url + "/update/" + id, trip);
  }
}
