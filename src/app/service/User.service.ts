import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User.model';

const url = 'https://backend5-mohammed-khaled-dev.apps.sandbox.x8i5.p1.openshiftapps.com/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  createUser(user: User): Observable<User> {
    return this.http.post<User>(url + '/create', user);
  }
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(url + '/get/' + id);
  }
  deleteUserById(id: number): Observable<User> {
    return this.http.delete<User>(url + '/delete/' + id);
  }
  deleteAllUsers(): Observable<User> {
    return this.http.delete<User>(url + '/deleteall');
  }
  //login service
  userLogin(user: User): Observable<User> {
    return this.http.post<User>(url + '/login', user);
  }
}
