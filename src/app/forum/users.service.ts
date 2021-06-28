import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/User';
import { config } from '../config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: Observable<User[]> = [];//למה זה לא תקין??
  constructor(private http: HttpClient) { }


  getUsers() {
    // return this.http.get<User[]>(config.usersUrl);
    this.users =  this.http.get<User[]>(config.usersUrl);
    return this.users;
  }

  getUserById(id: number){
    return this.users.pipe//איך מסננים רק את המשתמש של האידי מתוך הרשימה??
  }
}
