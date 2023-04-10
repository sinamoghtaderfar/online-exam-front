import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //add user
  public addUser(user) {
    return this.http.post(`${baseUrl}/user/`, user);
  }

  // get all user
  public allUser() {
    return this.http.get(`${baseUrl}/user/all-user`);
  }

  // delete user by id
  public deleteUserById(userId) {
    return this.http.delete(`${baseUrl}/user/${userId}`);
  }

  // get user by id
  public getUserById(userId) {
    return this.http.get(`${baseUrl}/user/${userId}`);
  }
}
